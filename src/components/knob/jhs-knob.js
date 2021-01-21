import React from "react"

const JhsKnob = ({
  size = 64,
  colors = {
    primary: "#1F1B1C",
    secondary: "lightslategrey",
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
      <circle
        cx="60"
        cy="60"
        r="56"
        fill={colors.primary}
        strokeWidth="4"
        stroke={colors.secondary}
      />
      <path
        fill={colors.primary}
        stroke={colors.secondary}
        strokeWidth="4"
        d="M104.37701,29.5816271 L115.312765,54.8801148 L131.754021,77 L115.312765,99.1198852 L104.37701,124.418373 L77,121.23977 L49.6229896,124.418373 L38.687235,99.1198852 L22.2459793,77 L38.687235,54.8801148 L49.6229896,29.5816271 L77,32.7602296 L104.37701,29.5816271 Z"
        transform="rotate(30 60 60) translate(-17 -16.073)"
      />
      <rect
        width="8"
        height="40"
        x="56"
        y="16"
        fill={colors.tick}
        rx="4"
        ry="4"
      />
    </g>
  </svg>
)

export default JhsKnob
