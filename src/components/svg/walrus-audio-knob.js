import React from "react"
import styled from "styled-components"

const StyledGradientBackground = styled.div`
  postion: relative;
  --size: ${props => props.size - 2}px;

  &:before {
    position: absolute;
    content: " ";
    width: var(--size);
    height: var(--size);
    top: 1px;
    left: 1px;
    background: conic-gradient(
      from 120deg,
      #8a8a8a,
      #000,
      #000,
      #8a8a8a,
      #000,
      #000,
      #8a8a8a
    );
    border-radius: 50%;
  }
`

const WalrusAudioKnob = ({ size = 48 }) => (
  <StyledGradientBackground size={size}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
    >
      <g fill="none" fillRule="evenodd">
        <circle cx="32" cy="32" r="30" stroke="#2c2c2c" strokeWidth="4" />
        <rect width="3" height="28" x="31" y="4" fill="#FFF" />
      </g>
    </svg>
  </StyledGradientBackground>
)

export default WalrusAudioKnob
