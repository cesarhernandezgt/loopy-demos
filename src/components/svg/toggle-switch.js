import React from "react"

const ToggleSwitch = ({ size = 64, state = 1, orientation = "vertical" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 78 78"
  >
    <g
      fill="none"
      transform={`rotate(${orientation === "vertical" ? 0 : -90} 39 39)`}
    >
      <circle cx="39" cy="39" r="35" fill="lightslategray" />
      <polygon
        fill="silver"
        points="38 13.073 59.651 25.573 59.651 50.573 38 63.073 16.349 50.573 16.349 25.573"
        transform="translate(1 1), rotate(90 38 38)"
      />
      <circle
        cx="39"
        cy="39"
        r="14"
        fill="#221C20"
        stroke="aliceblue"
        strokeWidth="4"
      />
      {[1, 3].includes(state) && (
        <path
          fill="aliceblue"
          d="M33.4495864,37.5137839 L32.0123721,3.36748499 C31.9841547,2.69720815 32.293878,2.05743308 32.8371365,1.66381217 C34.3680175,0.554604055 36.1583936,0 38.2082648,0 C40.2587744,0 42.0496273,0.554949561 43.5808233,1.66484868 C44.1232285,2.05800303 44.4327681,2.69661128 44.4053766,3.36595678 L43.0083372,37.5043286 C42.9762266,38.2888217 42.4880722,38.9819629 41.7602586,39.2764929 C40.5683519,39.758831 39.384354,40 38.2082648,40 C37.0357672,40 35.8632979,39.7603017 34.6908568,39.280905 C33.9673243,38.9850431 33.4824584,38.2947787 33.4495864,37.5137839 Z"
          stroke="lightslategray"
          transform={`rotate(${state === 1 ? 15 : 165} 39 39)`}
        />
      )}
      {state === 2 && (
        <circle
          cx="39"
          cy="39"
          r="7"
          fill="aliceblue"
          stroke="lightslategray"
          strokeWidth="2"
        />
      )}
    </g>
  </svg>
)

export default ToggleSwitch
