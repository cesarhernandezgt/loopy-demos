import React from "react"

const Led = ({
  isOn = false,
  socket = false,
  id = "",
  size = 36,
  colors = { on: "#D50000", off: "#800000a1", socket: "gray" },
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 48 48"
    id={id}
  >
    <g fill="none" fillRule="evenodd">
      {socket ? (
        <circle
          cx="24"
          cy="24"
          r="12"
          fill={colors.off}
          stroke={colors.socket}
          strokeWidth="6"
        />
      ) : (
        <circle cx="24" cy="24" r="8" fill={colors.off} />
      )}
      {isOn && (
        <>
          <circle cx="24" cy="24" r="8" fill={colors.on} fillOpacity=".8" />
          <circle cx="24" cy="24" r="16" fill={colors.on} fillOpacity=".2" />
          <circle cx="24" cy="24" r="24" fill={colors.on} fillOpacity=".4" />
        </>
      )}
    </g>
  </svg>
)

export default Led
