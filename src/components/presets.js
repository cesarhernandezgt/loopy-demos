import React from "react"
import styled from "styled-components"

import Preset from "./preset"

const StyledPresetsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  /* max-width: 320px; */
`

const Presets = ({
  presets = [],
  onSelect = () => {},
  activePresetId = "",
}) => (
  <StyledPresetsContainer>
    {presets.map(({ label, settings, id, isSweep }) => (
      <Preset
        key={id}
        id={id}
        label={label}
        active={id === activePresetId}
        isSweep={isSweep}
        settings={settings}
        onSelect={onSelect}
      />
    ))}
  </StyledPresetsContainer>
)

export default Presets
