import React from "react"
import styled from "styled-components"

const AnimatedLine = styled.line`
  transition: transform 0.2s ease-in;
  transform: translateX(${({ dx }) => dx}px);
`

const MenuIcon = ({ open = false }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 48 48"
  >
    <g fill="none" fillRule="evenodd">
      <line
        x1="4"
        x2="44"
        y1="10"
        y2="10"
        stroke="#9580ff"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <AnimatedLine
        x1="12"
        x2="12"
        y1="6"
        y2="14"
        stroke="#ff80bf"
        strokeWidth="4"
        strokeLinecap="round"
        dx={open ? 28 : 0}
      />
      <line
        x1="4"
        x2="44"
        y1="24"
        y2="24"
        stroke="#9580ff"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <AnimatedLine
        x1="16"
        x2="16"
        y1="20"
        y2="28"
        stroke="#ff80bf"
        strokeWidth="4"
        strokeLinecap="round"
        dx={open ? 18 : 0}
      />
      <line
        x1="4"
        x2="44"
        y1="38"
        y2="38"
        stroke="#9580ff"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <AnimatedLine
        x1="8"
        x2="8"
        y1="34"
        y2="42"
        stroke="#ff80bf"
        strokeWidth="4"
        strokeLinecap="round"
        dx={open ? 30 : 0}
      />
    </g>
  </svg>
)

export default MenuIcon
