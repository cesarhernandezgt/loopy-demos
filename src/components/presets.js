import React from "react"
import styled from "styled-components"
import useDemoState from "../helpers/use-demo-state"

import Preset from "./preset"

const StyledPresetsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0;
`

const Presets = ({ presets = [] }) => {
  const { demoType, activePedal } = useDemoState()
  return (
    <StyledPresetsContainer>
      {presets
        .filter(preset => demoType === "single" || Boolean(preset[activePedal]))
        .map(({ label, id, isSweep, ...rest }) => (
          <Preset key={id} id={id} label={label} isSweep={isSweep} {...rest} />
        ))}
    </StyledPresetsContainer>
  )
}

export default Presets
