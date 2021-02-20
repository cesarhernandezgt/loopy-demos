import React from "react"

const SimpleKnob = ({
  size = 64,
  colors = {
    tick: "#1F1B1C",
    primary: "#FFFDFE",
    background: "black",
  },
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 120 120"
  >
    <g fill="none">
      <circle cx="60" cy="60" r="60" fill={colors.background} strokeWidth="4" />
      <circle cx="60" cy="60" r="36" fill={colors.primary} strokeWidth="4" />
      <polygon
        points="60,5 35,105 85,105"
        fill={colors.primary}
        strokeWidth="4"
        strokeLinejoin="round"
        stroke={colors.primary}
        rx="4"
        ry="4"
      />
      <rect
        width="4"
        height="48"
        x="58"
        y="2"
        fill={colors.tick}
        rx="2"
        ry="2"
      />
    </g>
  </svg>
)

export default SimpleKnob
