import React from "react"
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
  }
`

const AudioPlayer = ({
  presets = [],
  tracks = [],
  activePreset = {},
  togglePlay = () => {},
  isPlaying = false,
  isPedalOn = false,
}) => {
  const tracksAreLoading = tracks.length < presets.length

  return (
    <>
      <StyledPlayerContainer>
        <PlayButton
          onClick={() => {
            togglePlay()
          }}
          isPlaying={isPlaying}
          isLoading={isPlaying && tracksAreLoading}
        />
        <StyledPlayerContent>
          {isPlaying && tracksAreLoading ? (
            <LoadingBar progress={(tracks.length / presets.length) * 100} />
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
