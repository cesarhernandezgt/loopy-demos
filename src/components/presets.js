import React from "react"
import styled from "styled-components"

import Preset from "./preset"

const StyledPresetsContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 42px;
  box-shadow: 0px 0px 0 10px var(--darkPurple) inset;

  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  overflow-x: auto;
  scrollbar-width: none;
}
  scrollbar-color: transparent transparent;

  ::-webkit-scrollbar {
    display: none;
  }
`

const Presets = ({ presets = [] }) => (
  <StyledPresetsContainer>
    {presets.map(({ label, id, isSweep }) => (
      <Preset key={id} id={id} label={label} isSweep={isSweep} />
    ))}
  </StyledPresetsContainer>
)

export default Presets
