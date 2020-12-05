import React from "react"
import styled from "styled-components"
import PlayButton from "./play-button"
import DisplayText from "./display-text"
import LoadingBar from "./loading-bar"
import AudioVisualizer from "./audio-visualizer"

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
  padding: 0 1rem;
  background: var(--dark);
  border-radius: 12px;
  overflow: hidden;
  border: 0.5rem solid var(--dark);

  > span {
    text-align: center;
    color: var(--cyan);
    font-family: "JetBrains Mono", cursive;
    font-size: 0.9rem;
    line-height: 1.2rem;
  }
`

const AudioPlayer = ({
  presets = [],
  tracks = [],
  togglePlay = () => {},
  isPlaying = false,
  isDisabled = false,
}) => {
  const tracksAreLoading = tracks.length < presets.length
  const showLoadingBar = isPlaying && tracksAreLoading
  const showVisualizer = isPlaying && !tracksAreLoading

  const renderPlayerContent = () => {
    if (showLoadingBar)
      return <LoadingBar progress={(tracks.length / presets.length) * 100} />

    if (showVisualizer) return <AudioVisualizer />

    return <DisplayText isPlaying={isPlaying} isDisabled={isDisabled} />
  }

  return (
    <>
      <StyledPlayerContainer>
        <PlayButton
          onClick={() => {
            togglePlay()
          }}
          isPlaying={isPlaying}
          isLoading={isPlaying && tracksAreLoading}
          isDisabled={isDisabled}
        />
        <StyledPlayerContent>{renderPlayerContent()}</StyledPlayerContent>
      </StyledPlayerContainer>
    </>
  )
}

export default AudioPlayer
