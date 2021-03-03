import React, { useEffect, useState, useRef } from "react"
import AudioPlayerInterface from "./audio-player-interface"
import useDemoState from "../../helpers/use-demo-state"

const CLEAN_TONE = "CLEAN_TONE"
const MEDIA_ROOT_URL = "https://loopydemos.s3.us-east-2.amazonaws.com"

const AudioPlayerController = ({ presets = [], slug = "", pedals = [] }) => {
  const {
    demoType,
    pedalsOn,
    getIsPedalOn,
    activePedal,
    activePreset,
    sweepSetting,
    presetsLoaded,
    presetLoadingErrors,
    hasLoadingStarted,
    setHasLoadingStarted,
    addPresetsLoaded,
    addPresetLoadingError,
  } = useDemoState()

  // We trigger play/stop by changing the state and listen on it
  // in a useEffect, treating the playback as a sideeffect
  const [isPlaying, setIsPlaying] = useState(false)
  // we hydrate the actual audio data with a fetch on mount or after
  // the user hit 'play' the first time
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false)
  // We need to keep track of the currently playing sourcenode
  // to delete it after the next track started playing
  const [currentPlaying, setCurrentPlaying] = useState({
    source: null,
    id: "",
  })
  const [audioContext, setAudioContext] = useState(null)
  // We need these to keep the tracks in sync with the audio context
  const [startOffset, setStartOffset] = useState(0)
  const [endOffset, setEndOffset] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  // we count the number of currently decoding audio files and delay
  // other decoding jobs to limit memory overflow and crackling
  const decoding = useRef(0)
  // we hold the decoded audio in a mutable object for the lifetime
  // of the component
  const audioData = useRef([])

  /**
   * -------------------------------------------------------------
   * LOADING OF AUDIO DATA
   * -------------------------------------------------------------
   */

  const decodeAudio = async ({ id, response, setLoaded }) => {
    /**
     * Prevent decoding more than 2 files at once. This should prevent
     * crashing in mobile browsers and keeps the crackling at bay
     */
    if (decoding.current >= 2) {
      await new Promise(resolve =>
        setTimeout(() => {
          resolve()
        }, 500)
      )
      return decodeAudio({ id, response, setLoaded })
    }

    const buffer = await response.arrayBuffer()
    return new Promise((resolve, reject) => {
      decoding.current += 1
      audioContext.decodeAudioData(
        buffer,
        audioBuffer => {
          audioData.current.push({ id, audioBuffer })
          decoding.current -= 1
          if (setLoaded) {
            addPresetsLoaded(id)
          }
          resolve()
        },
        ({ err }) => {
          reject()
          throw Error(err)
        }
      )
    }).catch(error => {
      addPresetLoadingError(id)
      console.error(error)
    })
  }

  const hydrateAudioState = () => {
    const presetList =
      demoType === "comparison"
        ? pedals
            .reduce(
              (acc, pedal) => [
                ...acc,
                ...presets.map(preset => ({
                  isSweep: Boolean(preset.isSweep),
                  id: preset[pedal?.name]?.id,
                })),
              ],
              []
            )
            .filter(({ id }) => Boolean(id))
        : presets
    setHasLoadingStarted(true)
    // First, load presets
    Promise.all(
      [...presetList, { id: CLEAN_TONE }]
        .filter(({ isSweep }) => !isSweep)
        .map(async ({ id }) => {
          const url = `${MEDIA_ROOT_URL}/${slug}/${
            id === CLEAN_TONE ? "clean" : id
          }.mp3`

          try {
            const response = await fetch(url)

            if (!response.ok) {
              throw Error(response.statusText)
            }

            return decodeAudio({ id, response, setLoaded: true })
          } catch (error) {
            addPresetLoadingError(id)
            console.error(error)
            return null
          }
        })
    ).then(() => {
      // Fetch the sweeps afterwards to prioritize normal presets
      presets
        .filter(({ isSweep }) => isSweep)
        .forEach(({ id, values }) => {
          Promise.all(
            values.map(async value => {
              const url = `${MEDIA_ROOT_URL}/${slug}/${id}_${value}.mp3`

              try {
                const response = await fetch(url)
                if (!response.ok) {
                  throw Error(response.statusText)
                }

                return decodeAudio({
                  id: `${id}_${value}`,
                  response,
                })
              } catch (error) {
                addPresetLoadingError(id)
                console.error(error)
                return null
              }
            })
          )
            .then(() => {
              addPresetsLoaded(id)
            })
            .catch(() => {
              console.error(
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
    if (hasPlayedOnce && !hasLoadingStarted) {
      hydrateAudioState()
    }
  }, [hasPlayedOnce])

  /**
   * -------------------------------------------------------------
   * PLAYBACK HANDLING
   * -------------------------------------------------------------
   */
  const togglePlay = () => {
    setIsPlaying(!isPlaying)

    if (["suspended", "closed", "interrupted"].includes(audioContext?.state)) {
      audioContext.resume().then(() => {
        setHasPlayedOnce(true)
      })
    } else {
      setHasPlayedOnce(true)
    }
  }

  const playTrack = presetId => {
    const selectedAudioData = audioData.current.find(
      ({ id }) => id === presetId
    )

    // If the audio is not loaded yet
    // or we are already playing it,
    // exit
    if (!selectedAudioData || currentPlaying.id === presetId) {
      return
    }

    const { audioBuffer } = selectedAudioData
    const audioSource = audioContext.createBufferSource()
    audioSource.buffer = audioBuffer
    audioSource.loop = true
    audioSource.connect(audioContext.destination)

    if (currentPlaying.source) {
      currentPlaying.source.stop()
    }

    setCurrentPlaying({ id: presetId, source: audioSource })
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
    currentPlaying.source.stop()
    setCurrentPlaying({ id: "", source: null })
    setCurrentTime(
      prevTime => prevTime + audioContext.currentTime - startOffset
    )
    setEndOffset(audioContext.currentTime)
  }

  useEffect(() => {
    if (isPlaying) {
      let activePresetId = CLEAN_TONE

      if (getIsPedalOn(activePedal)) {
        activePresetId =
          demoType === "single" ? activePreset.id : activePreset[activePedal].id

        if (activePreset.isSweep) {
          const { target, initialValue } = activePreset
          const level =
            typeof sweepSetting[target] === "undefined"
              ? initialValue
              : sweepSetting[target]
          activePresetId += `_${level}`
        }
      }

      playTrack(activePresetId)
    } else if (currentPlaying.source) {
      stopTrack()
    }
  }, [
    isPlaying,
    presetsLoaded,
    pedalsOn,
    activePedal,
    activePreset,
    sweepSetting,
  ])

  let activePresetId = CLEAN_TONE

  if (getIsPedalOn(activePedal)) {
    activePresetId =
      demoType === "single" ? activePreset.id : activePreset[activePedal].id
  }

  return (
    <AudioPlayerInterface
      togglePlay={togglePlay}
      isPlaying={isPlaying}
      isDisabled={!audioContext}
      isLoading={!presetsLoaded.includes(activePresetId)}
      hasError={presetLoadingErrors.length > 0}
      isPedalOn={getIsPedalOn(activePedal)}
    />
  )
}

export default AudioPlayerController
