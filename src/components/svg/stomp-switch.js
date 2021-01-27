import React, { useState } from "react"

const StompSwitch = ({ onClick = () => {}, id = "", size = 64 }) => {
  const [isDown, setIsDown] = useState(false)

  return (
    <button
      type="button"
      onClick={onClick}
      id={id}
      style={{ margin: 0 }}
      onMouseDown={() => {
        setIsDown(true)
      }}
      onTouchStart={() => {
        setIsDown(true)
      }}
      onMouseUp={() => {
        setIsDown(false)
      }}
      onTouchEnd={() => {
        setIsDown(false)
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 52 52"
      >
        <defs>
          <radialGradient id="gradient1">
            <stop offset="0%" stopColor="aliceblue" />
            <stop offset="70%" stopColor="aliceblue" />
            <stop offset="95%" stopColor="lightslategray" />
          </radialGradient>
          <radialGradient id="gradient2">
            <stop offset="0%" stopColor="aliceblue" />
            <stop offset="80%" stopColor="aliceblue" />
            <stop offset="100%" stopColor="#a3bbd2" />
          </radialGradient>
        </defs>
        <g fill="none">
          <circle cx="26" cy="26" r="26" fill="url(#gradient1)" />
          <polygon
            fill="url(#gradient1)"
            stroke="slategray"
            points="32 8 52.785 20 52.785 44 32 56 11.215 44 11.215 20"
            transform="rotate(90 32 32) translate(-6, 6)"
          />
          <circle
            cx="26"
            cy={`${isDown ? 27 : 26}`}
            r={`${isDown ? 15 : 16}`}
            fill="slategray"
          />
          <circle
            cx="26"
            cy={`${isDown ? 26 : 24}`}
            r={`${isDown ? 15 : 16}`}
            fill="url(#gradient2)"
          />
        </g>
      </svg>
    </button>
  )
}

export default StompSwitch
