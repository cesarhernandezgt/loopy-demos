import React from "react"

const OffsetKnob = ({ size = 64 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 132 133"
  >
    <g fill="none" transform="translate(-11 -10.073)">
      <circle cx="77" cy="77" r="66" fill="#1F1B1C" />
      <path
        fill="#1F1B1C"
        stroke="#404040"
        strokeWidth="2"
        d="M104.37701,29.5816271 L115.312765,54.8801148 L131.754021,77 L115.312765,99.1198852 L104.37701,124.418373 L77,121.23977 L49.6229896,124.418373 L38.687235,99.1198852 L22.2459793,77 L38.687235,54.8801148 L49.6229896,29.5816271 L77,32.7602296 L104.37701,29.5816271 Z"
        transform="rotate(30 77 77)"
      />
      <rect width="4" height="40" x="75" y="30" fill="#FFFDFE" />
      <circle
        cx="77"
        cy="16"
        r="4"
        fill="#FFFDFE"
        transform="matrix(-1 0 0 1 154 0)"
      />
    </g>
  </svg>
)

export default OffsetKnob
