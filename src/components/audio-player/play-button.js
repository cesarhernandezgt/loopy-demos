import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPause, faSpinner } from "@fortawesome/free-solid-svg-icons"

const StyledPlayButton = styled.button`
  width: 70px;
  cursor: pointer;
  font-size: 2.5rem;
  color: var(--yellow);
`

const PlayButton = ({
  onClick = () => {},
  isLoading = false,
  isPlaying = false,
}) => {
  let Icon = () => <FontAwesomeIcon icon={faPlay} />

  if (isPlaying && isLoading) {
    Icon = () => <FontAwesomeIcon icon={faSpinner} spin />
  }

  if (isPlaying && !isLoading) {
    Icon = () => <FontAwesomeIcon icon={faPause} />
  }

  return (
    <StyledPlayButton type="button" onClick={onClick}>
      <Icon />
    </StyledPlayButton>
  )
}

export default PlayButton
