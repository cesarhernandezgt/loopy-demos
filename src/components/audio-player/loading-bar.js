import React from "react"
import styled from "styled-components"

const StyledLoadingBar = styled.div`
  height: 1.2rem;
  border-radius: 12px;
  border: 2px solid var(--cyan);
  margin-top: 0.5rem;
  display: flex;
  overflow: hidden;
  width: 100%;
  max-width: 400px;

  :before {
    content: " ";
    height: 100%;
    background: var(--cyan);
    width: ${({ ratio }) => ratio}%;
    min-width: 5%;
    transition: width 0.4s ease-in;
  }
`

const LoadingBar = ({ progress = 0 }) => {
  return (
    <>
      <span>Waiting for tracks</span>
      <StyledLoadingBar ratio={progress} />
    </>
  )
}

export default LoadingBar
