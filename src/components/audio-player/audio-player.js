import React, { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import styled from "styled-components"
import PlayButton from "./play-button"
import DisplayText from "./display-text"
import LoadingBar from "./loading-bar"

const StyledPlayerContainer = styled.div`
  background: var(--purple);
  border-radius: 12px;
  width: 100%;
  height: 78px;
  margin-bottom: 0.5rem;
  display: flex;
  padding: 4px 4px 4px 0;
  box-sizing: border-box;
`

const StyledPlayerContent = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  background: var(--dark);
  border-radius: 12px;

  > span {
    text-align: center;
    color: var(--cyan);
    font-family: "Share Tech Mono";
    /* font-size: 1rem; */
  }
`

const CLEAN_TONE = "CLEAN_TONE"
const MEDIA_ROOT_URL = "https://loopydemos.s3.us-east-2.amazonaws.com"

const AudioPlayer = ({
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
  const [audioData, setAudioData] = useState([])
  const [tracksLoaded, setTracksLoaded] = useState(
    presetsWithClean.map(({ id }) => ({ id, isLoaded: false }))
  )

  /**
   * Initialize tracks
   */
  useEffect(() => {
    setAudioData(
      presetsWithClean.map(({ id, audio }) => {
        const url = `${MEDIA_ROOT_URL}/${slug}/${audio}`
        const audioElement = new Audio(url)
        audioElement.muted = true
        audioElement.loop = true

        return { id, url, audio: audioElement }
      })
    )
  }, [])

  /**
   * Check if we have enough data to play without interruption
   */
  useEffect(() => {
    const mapReadyState = () => {
      setTracksLoaded(
        audioData.map(({ id, audio }) => ({
          id,
          isLoaded: audio.readyState === 4,
        }))
      )
    }

    if (audioData.length > 0) {
      // we might already have all the data if network
      // is fast
      mapReadyState()
      // but also check every 3 seconds if something changed
      setInterval(mapReadyState, 3000)
    }
  }, [audioData])

  /**
   * When play button was pressed, we play all tracks at once,
   * but only if all tracks are loaded
   */
  useEffect(() => {
    const allTracksLoaded = tracksLoaded.every(({ isLoaded }) => isLoaded)
    audioData.forEach(({ audio }) => {
      if (isPlaying && allTracksLoaded) {
        audio.play()
      } else {
        audio.pause()
      }
    })
  }, [isPlaying, tracksLoaded])

  const unmutePreset = presetId => {
    audioData.forEach(({ id, audio }) => {
      // eslint-disable-next-line no-param-reassign
      audio.muted = id !== presetId
    })
  }

  /**
   * Changing presets means unmuting one preset and muting the rest
   */
  useEffect(() => {
    if (isPedalOn) {
      unmutePreset(activePreset?.id)
    } else {
      unmutePreset(CLEAN_TONE)
    }
  }, [activePreset, audioData, isPedalOn])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <>
      {/* Optimization of preloading all tracks */}
      <Helmet>
        <link rel="dns-prefetch" href={MEDIA_ROOT_URL} />
        <link rel="preconnect" href={MEDIA_ROOT_URL} />
        {audioData.map(({ id, url }) => (
          <link rel="prefetch" href={url} key={id} />
        ))}
        {audioData.map(({ id, url }) => (
          <link rel="preload" href={url} key={id} as="audio" />
        ))}
      </Helmet>
      <StyledPlayerContainer>
        <PlayButton
          onClick={() => {
            togglePlay()
          }}
          isPlaying={isPlaying}
          isLoading={
            isPlaying && tracksLoaded.some(({ isLoaded }) => !isLoaded)
          }
        />
        <StyledPlayerContent>
          {isPlaying && tracksLoaded.some(({ isLoaded }) => !isLoaded) ? (
            <LoadingBar tracks={presetsWithClean} tracksLoaded={tracksLoaded} />
          ) : (
            <DisplayText
              activePreset={activePreset}
              isPlaying={isPlaying}
              isPedalOn={isPedalOn}
            />
          )}
        </StyledPlayerContent>
      </StyledPlayerContainer>
    </>
  )
}

export default AudioPlayer
