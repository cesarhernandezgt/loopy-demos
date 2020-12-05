import React, { useEffect, useState } from "react"
import AudioPlayerInterface from "./audio-player-interface"
import useDemoState from "../../helpers/use-demo-state"

const CLEAN_TONE = "CLEAN_TONE"
const MEDIA_ROOT_URL = "https://loopydemos.s3.us-east-2.amazonaws.com"

const AudioPlayerController = ({ presets = [], slug = "" }) => {
  const {
    isPedalOn,
    activePreset,
    // sweepSetting
  } = useDemoState()

  // TODO: decide what to do with sweep
  const presetsWithClean = [
    ...presets,
    { id: CLEAN_TONE, audio: "clean.mp3" },
  ].filter(({ isSweep }) => !isSweep)

  const [isPlaying, setIsPlaying] = useState(false)
  const [loadingStarted, setLoadingStarted] = useState(false)
  const [audioData, setAudioData] = useState([])
  const [currentPlayingSource, setCurrentPlayingSource] = useState(null)
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false)
  const [audioContext, setAudioContext] = useState(null)
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
    presetsWithClean.forEach(({ audio, id }) => {
      const url = `${MEDIA_ROOT_URL}/${slug}/${audio}`
      fetch(url)
        .then(data => data.arrayBuffer())
        .then(buffer =>
          audioContext.decodeAudioData(buffer, audioBuffer => {
            setAudioData(prevAudioData => [
              ...prevAudioData,
              { id, audioBuffer },
            ])
          })
        )
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

    if (audioContext && audioContext?.state !== "suspended") {
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
    setIsPlaying(!isPlaying)

    if (audioContext?.state === "suspended") {
      audioContext.resume().then(() => {
        setHasPlayedOnce(true)
      })
    }
  }

  const playTrack = presetId => {
    const { audioBuffer } = audioData.find(({ id }) => id === presetId)
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
    const activePresetId = isPedalOn ? activePreset.id : CLEAN_TONE
    if (isPlaying && audioData.length === presetsWithClean.length) {
      playTrack(activePresetId)
    } else if (currentPlayingSource) {
      stopTrack()
    }
  }, [isPlaying, audioData, isPedalOn, activePreset])

  return (
    <AudioPlayerInterface
      presets={presetsWithClean}
      tracks={audioData}
      togglePlay={togglePlay}
      isPlaying={isPlaying}
      isDisabled={!audioContext}
    />
  )
}

export default AudioPlayerController
