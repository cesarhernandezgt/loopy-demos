import React from "react"

const SimpleKnob = ({
  size = 64,
  colors = {
    primary: "#1F1B1C",
    tick: "#FFFDFE",
  },
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 120 120"
  >
    <g fill="none">
      <circle cx="60" cy="60" r="60" fill={colors.primary} strokeWidth="4" />
      <rect
        width="8"
        height="40"
        x="56"
        y="0"
        fill={colors.tick}
        rx="4"
        ry="4"
      />
    </g>
  </svg>
)

export default SimpleKnob
