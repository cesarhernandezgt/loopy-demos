import React, { useEffect, useState } from "react"
import AudioPlayerInterface from "./audio-player-interface"

const CLEAN_TONE = "CLEAN_TONE"
const MEDIA_ROOT_URL = "https://loopydemos.s3.us-east-2.amazonaws.com"

const AudioContext =
  (typeof window !== "undefined" && window.AudioContext) || // Default
  (typeof window !== "undefined" && window.webkitAudioContext) || // Safari and old versions of Chrome
  false

const audioContext = AudioContext ? new AudioContext() : null

const AudioPlayerController = ({
  presets = [],
  activePreset = {},
  // sweepSetting = {},
  isPedalOn = false,
  slug = "",
}) => {
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

  const hydrateAudioState = () => {
    setLoadingStarted(true)
    console.log("🔥")
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

  const togglePlay = () => {
    setIsPlaying(!isPlaying)

    if (audioContext?.state === "suspended") {
      audioContext.resume()
    }

    setHasPlayedOnce(true)
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

    audioSource.start(0, audioContext.currentTime % bufferLength)
  }

  // Async loading of audio files
  useEffect(() => {
    if (audioContext?.state !== "suspended") hydrateAudioState()
  }, [])

  useEffect(() => {
    if (hasPlayedOnce && !loadingStarted) hydrateAudioState()
  }, [hasPlayedOnce])

  // Handle play/pause/loading action
  useEffect(() => {
    const activePresetId = isPedalOn ? activePreset.id : CLEAN_TONE
    if (isPlaying && audioData.length === presetsWithClean.length) {
      playTrack(activePresetId)
    } else if (currentPlayingSource) {
      currentPlayingSource.stop()
    }
  }, [isPlaying, audioData, isPedalOn, activePreset])

  return (
    <AudioPlayerInterface
      presets={presetsWithClean}
      tracks={audioData}
      activePreset={activePreset}
      togglePlay={togglePlay}
      isPlaying={isPlaying}
      isPedalOn={isPedalOn}
      isDisabled={!audioContext}
    />
  )
}

export default AudioPlayerController
