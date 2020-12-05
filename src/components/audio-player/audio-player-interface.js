import React from "react"
import styled from "styled-components"
import PlayButton from "./play-button"
import DisplayText from "./display-text"
import AudioVisualizer from "./audio-visualizer"

const StyledPlayerContainer = styled.div`
  background: var(--purple);
  border-radius: 12px;
  width: 100%;
  height: 64px;
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
  padding: 0 1rem;
  background: var(--dark);
  border-radius: 12px;
  overflow: hidden;
  border: 0.5rem solid var(--dark);

  span {
    text-align: center;
    color: var(--cyan);
    font-family: "JetBrains Mono", cursive;
    font-size: 0.9rem;
    line-height: 1.2rem;
  }
`

const AudioPlayer = ({
  togglePlay = () => {},
  isPlaying = false,
  isDisabled = false,
  isLoading = true,
}) => (
  <StyledPlayerContainer>
    <PlayButton
      onClick={() => {
        togglePlay()
      }}
      isPlaying={isPlaying}
      isLoading={isPlaying && isLoading}
      isDisabled={isDisabled}
    />
    <StyledPlayerContent>
      {isPlaying && !isLoading ? (
        <AudioVisualizer />
      ) : (
        <DisplayText
          isPlaying={isPlaying}
          isLoading={isLoading}
          isDisabled={isDisabled}
        />
      )}
    </StyledPlayerContent>
  </StyledPlayerContainer>
)

export default AudioPlayer
