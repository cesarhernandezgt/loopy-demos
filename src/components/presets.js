import React from "react"
import styled from "styled-components"

import Preset from "./preset"

const StyledPresetsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`

const Presets = ({ presets = [] }) => (
  <StyledPresetsContainer>
    {presets.map(({ label, settings, id, isSweep, isHidden }) => (
      <Preset
        key={id}
        id={id}
        label={label}
        isSweep={isSweep}
        isHidden={isHidden}
        settings={settings}
      />
    ))}
  </StyledPresetsContainer>
)

export default Presets
