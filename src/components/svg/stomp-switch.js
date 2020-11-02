import React from "react"
import styled from "styled-components"

const StyledBlinkingCircle = styled.circle`
  @keyframes blink {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  animation: blink 2s ease-in-out infinite;
`

const StompSwitch = ({ onClick = () => {}, isOn = false }) => (
  <button type="button" onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      viewBox="0 0 80 80"
    >
      <g fill="none" fillRule="evenodd" transform="translate(8, 8)">
        {!isOn && (
          <StyledBlinkingCircle
            cx="32"
            cy="32"
            r="32"
            stroke="#80FFEA"
            strokeOpacity="1"
            strokeWidth="6"
          />
        )}
        <polygon
          fill="#A7A8AE"
          points="32 8 52.785 20 52.785 44 32 56 11.215 44 11.215 20"
          transform="rotate(90 32 32)"
        />
        <circle
          cx="32"
          cy="32"
          r="15"
          fill="#D2D1D6"
          stroke="#8C8C8C"
          strokeWidth="2"
        />
      </g>
    </svg>
  </button>
)

export default StompSwitch
