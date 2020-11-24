import React from "react"
import styled from "styled-components"

const StyledBlinkingCircle = styled.circle`
  animation: var(--blinkAnimation);
`

const StompSwitch = ({
  onClick = () => {},
  isOn = false,
  id = "",
  size = 64,
}) => (
  <button type="button" onClick={onClick} id={id}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
    >
      <defs>
        <radialGradient id="gradient1">
          <stop offset="0%" stopColor="aliceblue" />
          <stop offset="70%" stopColor="aliceblue" />
          <stop offset="95%" stopColor="lightslategray" />
        </radialGradient>
        <radialGradient id="gradient2">
          <stop offset="0%" stopColor="aliceblue" />
          <stop offset="80%" stopColor="aliceblue" />
          <stop offset="100%" stopColor="#a3bbd2" />
        </radialGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <circle cx="32" cy="32" r="26" fill="url(#gradient1)" />
        <polygon
          fill="url(#gradient1)"
          stroke="slategray"
          points="32 8 52.785 20 52.785 44 32 56 11.215 44 11.215 20"
          transform="rotate(90 32 32)"
        />
        <circle cx="32" cy="32" r="16" fill="url(#gradient2)" />
        {!isOn && <StyledBlinkingCircle cx="32" cy="32" r="6" fill="#80FFEA" />}
      </g>
    </svg>
  </button>
)

export default StompSwitch
