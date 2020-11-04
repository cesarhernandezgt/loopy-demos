import React from "react"

const PlayButtonIcon = ({ isPlaying }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    viewBox="0 0 100 100"
  >
    {!isPlaying ? (
      <g>
        <rect
          width="12"
          height="32"
          x="21"
          y="19"
          fill="#FFFF80"
          strokeWidth="4"
          stroke="#FFFF80"
          strokeLinejoin="round"
        />
        <rect
          width="12"
          height="32"
          x="40"
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

export default PlayButtonIcon
