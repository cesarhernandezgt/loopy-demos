import React, { useEffect, useState } from "react"
import AudioPlayerInterface from "./audio-player-interface"
import useDemoState from "../../helpers/use-demo-state"

const CLEAN_TONE = "CLEAN_TONE"
const MEDIA_ROOT_URL = "https://loopydemos.s3.us-east-2.amazonaws.com"

const AudioPlayerController = ({ presets = [], slug = "" }) => {
  const {
    isPedalOn,
    activePreset,
    sweepSetting,
    presetsLoaded,
    addPresetsLoaded,
    setAudioState,
  } = useDemoState()

  // We trigger play/stop by changing the state and listen on it
  // in a useEffect, treating the playback as a sideeffect
  const [isPlaying, setIsPlaying] = useState(false)
  const [loadingStarted, setLoadingStarted] = useState(false)
  // we hydrate the actual audio data with a fetch on mount or after
  // the user hit 'play' the first time
  const [audioData, setAudioData] = useState([])
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false)
  // We need to keep track of the currently playing sourcenode
  // to delete it after the next track started playing
  const [currentPlayingSource, setCurrentPlayingSource] = useState(null)
  const [audioContext, setAudioContext] = useState(null)
  // We need these to keep the tracks in sync with the audio context
  const [startOffset, setStartOffset] = useState(0)
  const [endOffset, setEndOffset] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  /**
   * -------------------------------------------------------------
   * LOADING OF AUDIO DATA
   * -------------------------------------------------------------
   */
  const hydrateAudioState = () => {
    setLoadingStarted(true)
    // First, load presets
    Promise.all(
      [...presets, { id: CLEAN_TONE }]
        .filter(({ isSweep }) => !isSweep)
        .map(({ id }) => {
          const url = `${MEDIA_ROOT_URL}/${slug}/${
            id === CLEAN_TONE ? "clean" : id
          }.mp3`

          return fetch(url)
            .then(response => {
              if (!response.ok) {
                throw Error(response.statusText)
              }
              return response
            })
            .then(data => data.arrayBuffer())
            .then(buffer =>
              audioContext.decodeAudioData(buffer, audioBuffer => {
                setAudioData(prevAudioData => [
                  ...prevAudioData,
                  { id, audioBuffer },
                ])
              })
            )
            .then(() => {
              addPresetsLoaded(id)
            })
            .catch(error => {
              console.error(error)
              return Promise.reject()
            })
        })
    ).then(() => {
      // Fetch the sweeps afterwards to prioritize normal presets
      presets
        .filter(({ isSweep }) => isSweep)
        .forEach(({ id, values }) => {
          Promise.all(
            values.map(value => {
              const url = `${MEDIA_ROOT_URL}/${slug}/${id}_${value}.mp3`
              return fetch(url)
                .then(response => {
                  if (!response.ok) {
                    throw Error(response.statusText)
                  }
                  return response
                })
                .then(data => data.arrayBuffer())
                .then(buffer =>
                  audioContext.decodeAudioData(buffer, audioBuffer => {
                    setAudioData(prevAudioData => [
                      ...prevAudioData,
                      { id: `${id}_${value}`, audioBuffer },
                    ])
                  })
                )
                .catch(error => {
                  console.error(error)
                  return Promise.reject()
                })
            })
          )
            .then(() => {
              addPresetsLoaded(id)
            })
            .catch(() => {
              console.log(
                `Well ... cannot load all audio for ${id} ¯\\_(ツ)_/¯`
              )
            })
        })
    })
  }

  useEffect(() => {
    let scopedAudioContext = null
    const AudioContext =
      (typeof window !== "undefined" && window.AudioContext) || // Default
      (typeof window !== "undefined" && window.webkitAudioContext) || // Safari and old versions of Chrome
      false

    if (AudioContext) {
      scopedAudioContext = new AudioContext()
      setAudioContext(scopedAudioContext)
    }

    return () => {
      if (scopedAudioContext) {
        scopedAudioContext.close()
      }
    }
  }, [])

  useEffect(() => {
    setAudioState(audioContext?.state)
    if (audioContext?.state === "suspended") {
      audioContext
        .resume()
        .then(() => {
          hydrateAudioState()
        })
        .catch(() => {
          console.warn("That didn't work ...")
        })
    }

    if (audioContext && audioContext.state !== "suspended") {
      hydrateAudioState()
    }
  }, [audioContext])

  useEffect(() => {
    if (hasPlayedOnce && !loadingStarted) hydrateAudioState()
  }, [hasPlayedOnce])

  /**
   * -------------------------------------------------------------
   * PLAYBACK HANDLING
   * -------------------------------------------------------------
   */
  const togglePlay = () => {
    setAudioState(audioContext?.state)
    setIsPlaying(!isPlaying)

    if (["suspended", "closed", "interrupted"].includes(audioContext?.state)) {
      audioContext.resume().then(() => {
        setHasPlayedOnce(true)
      })
    }
  }

  const playTrack = presetId => {
    const selectedAudioData = audioData.find(({ id }) => id === presetId)

    // If the audio is not loaded yet, exit
    if (!selectedAudioData) {
      return
    }

    const { audioBuffer } = selectedAudioData
    const audioSource = audioContext.createBufferSource()
    audioSource.buffer = audioBuffer
    audioSource.loop = true
    audioSource.connect(audioContext.destination)

    if (currentPlayingSource) {
      currentPlayingSource.stop()
    }

    setCurrentPlayingSource(audioSource)
    const bufferLength = audioBuffer.length / audioBuffer.sampleRate

    if (endOffset > startOffset || startOffset === 0) {
      audioSource.start(0, currentTime % bufferLength)
      setStartOffset(audioContext.currentTime)
    } else {
      audioSource.start(
        0,
        (currentTime + audioContext.currentTime - startOffset) % bufferLength
      )
    }
  }

  const stopTrack = () => {
    currentPlayingSource.stop()
    setCurrentPlayingSource(null)
    setCurrentTime(
      prevTime => prevTime + audioContext.currentTime - startOffset
    )
    setEndOffset(audioContext.currentTime)
  }

  useEffect(() => {
    let activePresetId = CLEAN_TONE

    if (isPedalOn) {
      activePresetId = activePreset.id

      if (activePreset.isSweep) {
        const { target, initialValue } = activePreset
        const level = sweepSetting[target] || initialValue
        activePresetId += `_${level}`
      }
    }

    if (isPlaying) {
      playTrack(activePresetId)
    } else if (currentPlayingSource) {
      stopTrack()
    }
  }, [isPlaying, audioData, isPedalOn, activePreset, sweepSetting])

  return (
    <AudioPlayerInterface
      togglePlay={togglePlay}
      isPlaying={isPlaying}
      isDisabled={!audioContext}
      isLoading={!presetsLoaded.includes(CLEAN_TONE) && !isPedalOn}
    />
  )
}

export default AudioPlayerController
