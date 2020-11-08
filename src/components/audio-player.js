import React, { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import styled from "styled-components"

import PlayButtonIcon from "./svg/play-button-icon"

const StyledPlayerContainer = styled.div`
  background: #9580ff;
  width: 100%;
  height: 70px;
  margin-bottom: 0.5rem;
  display: flex;
`

const StyledPlayButton = styled.button`
  width: 70px;
  cursor: pointer;
`

const CLEAN_TONE = "CLEAN_TONE"
const MEDIA_ROOT_URL = "https://loopydemos.s3.us-east-2.amazonaws.com"

const AudioPlayer = ({
  presets = [],
  activePreset = {},
  sweepSetting = {},
  isPedalOn = false,
  slug = "",
}) => {
  const presetsWithClean = [...presets, { id: CLEAN_TONE, audio: "clean.mp3" }]
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioData, setAudioData] = useState([])

  const unmutePreset = presetId => {
    audioData.forEach(({ id, audio }) => {
      // eslint-disable-next-line no-param-reassign
      audio.muted = id !== presetId
    })
  }

  useEffect(() => {
    let numberOfTracksLoaded = 0
    setAudioData(
      presetsWithClean
        .filter(({ isSweep }) => !isSweep)
        .map(({ id, audio }) => {
          const url = `${MEDIA_ROOT_URL}/${slug}/${audio}`
          const audioElement = new Audio(url)
          audioElement.muted = true
          audioElement.loop = true

          audioElement.oncanplay = () => {
            numberOfTracksLoaded += 1
            if (
              numberOfTracksLoaded >=
              presetsWithClean.filter(({ isSweep }) => !isSweep).length
            ) {
              setIsLoading(false)
            }
          }

          return { id, url, audio: audioElement }
        })
    )
  }, [])

  useEffect(() => {
    if (isPedalOn) {
      unmutePreset(activePreset?.id)
    } else {
      unmutePreset(CLEAN_TONE)
    }
  }, [activePreset, audioData, isPedalOn])

  const togglePlay = () => {
    // TODO: only start playing when all ready
    audioData.forEach(({ audio }) => {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
    })

    setIsPlaying(!isPlaying)
  }

  return (
    <>
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
          <PlayButtonIcon isPlaying={isPlaying} isLoading={isLoading} />
        </StyledPlayButton>
      </StyledPlayerContainer>
    </>
  )
}

export default AudioPlayer
