import React, { memo, useRef, useEffect, useState } from "react"
import styled, { css } from "styled-components"

const setAnimationDuration = index => css`
  :nth-child(${index}) {
    animation-duration: ${Math.random() * 200 + 400}ms;
  }
`

const StyledVisualizer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--dark);

  ${({ hide }) =>
    hide &&
    css`
      z-index: -1;
    `}

  @keyframes vizBar {
    from {
      transform: scaleY(1);
      opacity: 0.9;
    }
    to {
      transform: scaleY(1.2);
      opacity: 1;
    }
  }

  .bar {
    :not(:last-child) {
      margin-right: 2px;
    }

    width: 0.5rem;
    height: 60%;
    background: var(--cyan);
    border-radius: 2px;
    flex: 0 0 0.5rem;

    ${({ hide }) =>
      !hide &&
      css`
        animation: vizBar -1000ms 0ms linear infinite alternate;
      `}

    ${({ elements }) => elements.map(index => setAnimationDuration(index + 1))}
  }
`

const AudioVisualizer = ({ hide = true }) => {
  const [barArray, setBarArray] = useState([])
  const containerRef = useRef(null)

  useEffect(() => {
    const containerWidth = containerRef.current.offsetWidth
    // one bar is 8px + 2px margin
    const numberOfBars = Math.ceil(containerWidth / 10)
    setBarArray([...Array(numberOfBars).keys()])
  }, [])

  return (
    <StyledVisualizer elements={barArray} ref={containerRef} hide={hide}>
      {barArray.map(idx => (
        <div key={idx} className="bar" />
      ))}
    </StyledVisualizer>
  )
}

export default memo(AudioVisualizer)
