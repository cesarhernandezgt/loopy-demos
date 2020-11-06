import React, { useState, useEffect } from "react"
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

const AudioPlayer = ({
  presets = [],
  activePreset = {},
  sweepSetting = {},
  isPedalOn = false,
  clean = "",
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioData] = useState(
    [...presets, { id: CLEAN_TONE, audio: clean }]
      .filter(({ isSweep }) => !isSweep)
      .map(({ id, audio }) => {
        const audioElement = new Audio(audio)
        audioElement.muted = true
        audioElement.loop = true

        return { id, audio: audioElement }
      })
  )

  const unmutePreset = presetId => {
    audioData.forEach(({ id, audio }) => {
      audio.muted = id !== presetId
    })
  }

  useEffect(() => {
    if (isPedalOn) {
      unmutePreset(activePreset?.id)
    } else {
      unmutePreset(CLEAN_TONE)
    }
  }, [activePreset, audioData, isPedalOn])

  const togglePlay = () => {
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
      <div>
        <span>{`${activePreset.id}${
          activePreset.isSweep ? `_${sweepSetting[activePreset.target]}` : ""
        }.mp3`}</span>
      </div>
      <StyledPlayerContainer>
        <StyledPlayButton
          type="button"
          onClick={() => {
            togglePlay()
          }}
        >
          <PlayButtonIcon isPlaying={isPlaying} />
        </StyledPlayButton>
        <div />
      </StyledPlayerContainer>
    </>
  )
}

export default AudioPlayer
