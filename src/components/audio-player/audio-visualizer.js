import React, { memo } from "react"
import styled from "styled-components"

const setAnimationDuration = index => `
  :nth-child(${index}) {
    animation-duration: ${Math.random() * 200 + 400}ms;
  }
`

const StyledVisualizer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  @keyframes vizBar {
    from {
      height: 65%;
      opacity: 0.9;
    }
    to {
      height: 80%;
      opacity: 1;
    }
  }

  .bar {
    :not(:last-child) {
      margin-right: 2px;
    }

    width: 0.5rem;
    background: var(--cyan);
    border-radius: 2px;
    flex: 0 0 0.5rem;

    animation: vizBar -1000ms 0ms linear infinite alternate;

    ${({ elements }) => elements.map(index => setAnimationDuration(index + 1))}
  }
`

const AudioVisualizer = () => {
  const elementArray = [...Array(60).keys()]
  return (
    <StyledVisualizer elements={elementArray}>
      {elementArray.map(idx => (
        <div key={idx} className="bar" />
      ))}
    </StyledVisualizer>
  )
}

export default memo(AudioVisualizer)
