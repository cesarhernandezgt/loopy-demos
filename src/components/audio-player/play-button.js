import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPause, faSpinner } from "@fortawesome/free-solid-svg-icons"

const StyledPlayButton = styled.button`
  width: 64px;
  font-size: 36px;
  cursor: pointer;
  color: var(--yellow);

  &:disabled {
    opacity: 0.5;
  }
`

const PlayButton = ({
  onClick = () => {},
  isLoading = false,
  isPlaying = false,
  isDisabled = false,
}) => {
  let Icon = () => <FontAwesomeIcon icon={faPlay} />

  if (isPlaying && isLoading) {
    Icon = () => <FontAwesomeIcon icon={faSpinner} spin />
  }

  if (isPlaying && !isLoading) {
    Icon = () => <FontAwesomeIcon icon={faPause} />
  }

  return (
    <StyledPlayButton type="button" onClick={onClick} disabled={isDisabled}>
      <Icon />
    </StyledPlayButton>
  )
}

export default PlayButton
