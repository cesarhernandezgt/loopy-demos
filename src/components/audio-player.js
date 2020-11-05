import React, { useState } from "react"
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

const AudioPlayer = ({
  presets = [],
  activePreset = {},
  sweepSetting = {},
}) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
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
