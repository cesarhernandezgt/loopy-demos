import React from "react"
import styled from "styled-components"

import Preset from "./preset"

const StyledPresetsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0;
`

const Presets = ({ presets = [] }) => (
  <StyledPresetsContainer>
    {presets.map(({ label, id, isSweep }) => (
      <Preset key={id} id={id} label={label} isSweep={isSweep} />
    ))}
  </StyledPresetsContainer>
)

export default Presets
