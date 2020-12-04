import React from "react"
import styled from "styled-components"

const setAnimationDuration = index => `
  :nth-child(${index}) {
    animation-duration: ${Math.random() * 200 + 300}ms;
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
      height: 70%;
    }
    to {
      height: 90%;
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

    animation: vizBar -1000ms 0ms ease-out infinite alternate;

    ${({ elements }) => elements.map(index => setAnimationDuration(index + 1))}
  }
`

const AudioVisualizer = () => {
  const elementArray = [...Array(50).keys()]
  return (
    <StyledVisualizer elements={elementArray}>
      {elementArray.map(idx => (
        <div key={idx} className="bar" />
      ))}
    </StyledVisualizer>
  )
}

export default AudioVisualizer
