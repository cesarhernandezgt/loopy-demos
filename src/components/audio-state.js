import React from "react"
import styled from "styled-components"
import useDemoState from "../helpers/use-demo-state"

const StateTag = styled.div`
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  float: left;
  color: black;

  background: ${props => {
    switch (props.state) {
      case "suspended":
        return "#FF9580"
      case "closed":
        return "#FF9580"
      case "running":
        return "#8aff80"
      default:
        return "lightslategray"
    }
  }};
`

const AudioState = () => {
  const { audioState } = useDemoState()

  return <StateTag state={audioState}>{audioState || "null"}</StateTag>
}

export default AudioState
