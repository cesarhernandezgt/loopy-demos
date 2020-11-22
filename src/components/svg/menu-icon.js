import React from "react"
import styled from "styled-components"

const AnimatedSvg = styled.svg`
  transition: transform 0.2s ease-in;
  transform: rotate(${({ rotate }) => (rotate ? 170 : 0)}deg);
`

const MenuIcon = ({ rotate = false }) => (
  <AnimatedSvg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 48 48"
    rotate={rotate}
  >
    <g fill="none" fillRule="evenodd">
      <circle
        stroke="#ff80bf"
        strokeWidth="4"
        r="20"
        fill="none"
        cx="24"
        cy="24"
      />
      <line
        x1="24"
        y1="24"
        x2="24"
        y2="6"
        stroke="#ff80bf"
        strokeWidth="4"
        strokeLinecap="round"
        transform="rotate(-60 24 24)"
      />
    </g>
  </AnimatedSvg>
)

export default MenuIcon
