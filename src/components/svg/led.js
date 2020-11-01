import React from "react"

const Led = ({ isOn = false }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 48 48"
  >
    <g fill="none" fillRule="evenodd">
      <circle
        cx="24"
        cy="24"
        r="12"
        fill="maroon"
        stroke="gray"
        strokeWidth="4"
      />
      {isOn && (
        <>
          <circle cx="24" cy="24" r="8" fill="#D50000" fillOpacity=".8" />
          <circle cx="24" cy="24" r="16" fill="#D50000" fillOpacity=".20" />
          <circle cx="24" cy="24" r="24" fill="#D50000" fillOpacity=".3" />
        </>
      )}
    </g>
  </svg>
)

export default Led
