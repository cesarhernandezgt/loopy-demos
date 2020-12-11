import React from "react"
import styled from "styled-components"

const END_CIRCLE_RADIUS = 3

const StyledContainer = styled.div`
  --translateX: ${props => (props.isRightAligned ? 0 : -100)}%;
  --translateY: ${props => (props.isTopDown ? 0 : -100)}%;
  transform: translate(var(--translateX), var(--translateY));
`

const StyledLabel = styled.span`
  position: absolute;
  top: ${props => props.top - END_CIRCLE_RADIUS}px;
  left: ${props => props.left}px;
  margin: 0 1rem;
  transform: translate(${props => (props.isRightAligned ? 0 : -200)}%, -50%);
`
const LineLabel = ({
  id = "",
  start = { top: 0, left: 0 },
  end = { top: 0, left: 0 },
  label = "",
  color = "#fff",
}) => {
  const width = Math.max(Math.abs(start.left - end.left), END_CIRCLE_RADIUS * 2)
  const height = Math.max(Math.abs(start.top - end.top), END_CIRCLE_RADIUS * 2)

  const isRightAligned = start.left <= end.left
  const isTopDown = start.top <= end.top

  console.table(id)

  const startX = isRightAligned ? END_CIRCLE_RADIUS : width - END_CIRCLE_RADIUS
  const startY = isTopDown ? END_CIRCLE_RADIUS : height - END_CIRCLE_RADIUS

  const endX = isRightAligned ? width - END_CIRCLE_RADIUS : END_CIRCLE_RADIUS
  const endY = isTopDown ? height - END_CIRCLE_RADIUS : END_CIRCLE_RADIUS

  const bendX = width / 2

  return (
    <StyledContainer
      id={id}
      isTopDown={isTopDown}
      isRightAligned={isRightAligned}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        <g fill="none" fillRule="evenodd">
          <polyline
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            points={`${startX} ${startY} ${bendX} ${endY} ${endX} ${endY}`}
          />
          <circle cx={startX} cy={startY} r={END_CIRCLE_RADIUS} fill={color} />
          <circle cx={endX} cy={endY} r={END_CIRCLE_RADIUS} fill={color} />
        </g>
      </svg>
      <StyledLabel top={endY} left={endX} isRightAligned={isRightAligned}>
        {label}
      </StyledLabel>
    </StyledContainer>
  )
}

export default LineLabel
