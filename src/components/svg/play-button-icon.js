import React from "react"
import styled from "styled-components"

const Spinner = styled.svg`
  will-change: transform;
  animation: var(--spinAnimation);
`

const PlayButtonIcon = ({ isPlaying = false, isLoading = false }) => {
  if (isPlaying && isLoading)
    return (
      <Spinner
        xmlns="http://www.w3.org/2000/svg"
        width="70"
        height="70"
        viewBox="0 0 70 70"
      >
        <defs>
          <clipPath id="cut-off">
            <rect x="0" y="35" width="70" height="70" />
          </clipPath>
          <linearGradient id="gradient">
            <stop offset="0" stopColor="#FFFF80" />
            <stop offset="90%" stopColor="#FFFF80" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle
          cx="35"
          cy="35"
          r="14"
          fill="none"
          stroke="url(#gradient)"
          clipPath="url(#cut-off)"
          strokeWidth="4"
        />
      </Spinner>
    )

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="70"
      viewBox="0 0 70 70"
    >
      {isPlaying ? (
        <g>
          <rect
            width="10"
            height="32"
            x="21"
            y="19"
            fill="#FFFF80"
            strokeWidth="4"
            stroke="#FFFF80"
            strokeLinejoin="round"
          />
          <rect
            width="10"
            height="32"
            x="37"
            y="19"
            fill="#FFFF80"
            strokeWidth="4"
            stroke="#FFFF80"
            strokeLinejoin="round"
          />
        </g>
      ) : (
        <g fill="none" fillRule="evenodd">
          <polygon
            fill="#FFFF80"
            points="21 19 21 51 49 35"
            strokeWidth="4"
            stroke="#FFFF80"
            strokeLinejoin="round"
          />
        </g>
      )}
    </svg>
  )
}
export default PlayButtonIcon
