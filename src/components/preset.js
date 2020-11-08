import React from "react"
import styled from "styled-components"

const StyledPresetTag = styled.button`
  background: ${props => (props.isSweep ? "#ff80bf" : "#80FFEA")};
  color: black;
  font-size: 1rem;
  font-weight: 900;
  padding: 0.5rem;
  margin: 0 0.25rem 0.25rem 0;
  cursor: pointer;
  opacity: ${props => (props.active ? "1" : "0.5")};

  transition: opacity ease-in 0.2s;

  @media (min-width: 1024px) {
    font-size: 1.2rem;
  }
`

const Preset = ({
  id = "",
  label = "",
  active = false,
  isSweep = false,
  onSelect = () => {},
}) => (
  <StyledPresetTag
    active={active}
    isSweep={isSweep}
    type="button"
    onClick={() => {
      onSelect(id)
    }}
  >
    {label}
  </StyledPresetTag>
)

export default Preset
