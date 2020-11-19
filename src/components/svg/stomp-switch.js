import React from "react"
import styled from "styled-components"

const StyledBlinkingCircle = styled.circle`
  animation: var(--blinkAnimation);
`

const StompSwitch = ({
  onClick = () => {},
  isOn = false,
  id = "",
  size = 72,
}) => (
  <button type="button" onClick={onClick} id={id}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
    >
      <g fill="none" fillRule="evenodd">
        <polygon
          fill="#7f989e"
          points="32 8 52.785 20 52.785 44 32 56 11.215 44 11.215 20"
          transform="rotate(90 32 32)"
        />
        <circle
          cx="32"
          cy="32"
          r="16"
          fill="#d2e1e9"
          stroke="#bcc6cc"
          strokeWidth="2"
        />
        {!isOn && (
          <StyledBlinkingCircle
            cx="32"
            cy="32"
            r="16"
            stroke="#80FFEA"
            strokeWidth="2"
          />
        )}
      </g>
    </svg>
  </button>
)

export default StompSwitch
