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
  margin: 1.5rem 0 0.5rem;
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
    color: ${props => (props.hasError ? "var(--red)" : "var(--cyan)")};
    font-family: "JetBrains Mono", monospace;
    font-size: 0.9rem;
    line-height: 1.2rem;
  }
`

const StyledErrorCaption = styled.p`
  font-size: 1rem;
  line-height: 1rem;
  font-style: italic;
  color: var(--gray);
  margin: 0 0 0.5rem 0;
`

const AudioPlayerInterface = ({
  togglePlay = () => {},
  isPlaying = false,
  isDisabled = false,
  isLoading = true,
  hasError = false,
}) => (
  <>
    <StyledPlayerContainer>
      <PlayButton
        onClick={() => {
          togglePlay()
        }}
        isPlaying={isPlaying}
        isLoading={isPlaying && isLoading}
        isDisabled={isDisabled}
      />
      <StyledPlayerContent hasError={hasError}>
        {isPlaying && !isLoading ? (
          <AudioVisualizer />
        ) : (
          <DisplayText
            isPlaying={isPlaying}
            isLoading={isLoading}
            isDisabled={isDisabled}
            hasError={hasError}
          />
        )}
      </StyledPlayerContent>
    </StyledPlayerContainer>
    {hasError && (
      <StyledErrorCaption>
        *Maybe your ad blocker prevents the sounds from loading. Whitelist this
        page. Promise and pinky-swear: I will never run ads on this site.
      </StyledErrorCaption>
    )}
  </>
)

export default AudioPlayerInterface
