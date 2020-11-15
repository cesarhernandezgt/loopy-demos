import React, { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import styled from "styled-components"

import PlayButtonIcon from "./svg/play-button-icon"

const StyledPlayerContainer = styled.div`
  background: #ff80bf;
  border-radius: 12px;
  width: 100%;
  height: 70px;
  margin-bottom: 0.5rem;
  display: flex;
  padding: 4px 4px 4px 0;
`

const StyledPlayButton = styled.button`
  width: 70px;
  cursor: pointer;
`

const StyledPlayerContent = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #282a36;
  border-radius: 12px;

  > span {
    text-align: center;
    color: #80ffea;
    font-family: "Minecraft";
  }
`

const StyledLoadingBar = styled.div`
  height: 1.2rem;
  border-radius: 12px;
  border: 2px solid #80ffea;
  margin-top: 0.5rem;
  display: flex;
  overflow: hidden;
  width: 100%;
  max-width: 400px;

  :before {
    content: " ";
    height: 100%;
    background: #80ffea;
    width: ${({ ratio }) => ratio}%;
    min-width: 5%;
    transition: width 0.4s ease-in;
  }
`

const DisplayText = ({
  activePreset: { description, label },
  isPlaying,
  isPedalOn,
}) => {
  if (!isPlaying) return "Hit play and wear some headphones d[-_-]b"

  if (!isPedalOn) return "Here's ma clean tone."

  return description || label
}

const CLEAN_TONE = "CLEAN_TONE"
const MEDIA_ROOT_URL = "https://loopydemos.s3.us-east-2.amazonaws.com"

const AudioPlayer = ({
  presets = [],
  activePreset = {},
  sweepSetting = {},
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
        <StyledPlayButton
          type="button"
          onClick={() => {
            togglePlay()
          }}
        >
          <PlayButtonIcon
            isPlaying={isPlaying}
            isLoading={
              isPlaying && tracksLoaded.some(({ isLoaded }) => !isLoaded)
            }
          />
        </StyledPlayButton>
        <StyledPlayerContent>
          {isPlaying && tracksLoaded.some(({ isLoaded }) => !isLoaded) ? (
            <>
              <span>Waiting for tracks</span>
              <StyledLoadingBar
                ratio={
                  (tracksLoaded.filter(({ isLoaded }) => isLoaded).length /
                    presetsWithClean.length) *
                  100
                }
              />
            </>
          ) : (
            <span>
              <DisplayText
                activePreset={activePreset}
                isPlaying={isPlaying}
                isPedalOn={isPedalOn}
              />
            </span>
          )}
        </StyledPlayerContent>
      </StyledPlayerContainer>
    </>
  )
}

export default AudioPlayer
