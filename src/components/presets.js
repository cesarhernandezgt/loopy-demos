import React from "react"
import styled from "styled-components"

import Preset from "./preset"

const StyledPresetsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`

const Presets = ({ presets = [] }) => {
  return (
    <StyledPresetsContainer>
      {presets.map(({ label, settings, id, isSweep }) => (
        <Preset
          key={id}
          id={id}
          label={label}
          isSweep={isSweep}
          settings={settings}
        />
      ))}
    </StyledPresetsContainer>
  )
}

export default Presets
