import React from "react"

const SimpleDotKnob = ({
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
      <circle cx="60" cy="16" r="8" fill={colors.tick} />
    </g>
  </svg>
)

export default SimpleDotKnob
