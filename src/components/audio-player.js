import React from "react"
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
  border: 1px solid #80ffea;
  width: 70px;
`

const AudioPlayer = ({ preset = {}, sweepSetting = {} }) => {
  return (
    <>
      <div>
        {/* We'll map the audio files with the preset IDs and sweep values */}
        <h3>Audio Player</h3>
        <p>Current prest ID: {preset?.id}</p>
        {preset?.isSweep && (
          <p>Gain sweep value: {sweepSetting[preset.target]}</p>
        )}
      </div>
      <StyledPlayerContainer>
        <StyledPlayButton>
          <PlayButtonIcon isPlaying />
        </StyledPlayButton>
        <div />
      </StyledPlayerContainer>
    </>
  )
}

export default AudioPlayer
