import React from "react"
import styled from "styled-components"
import useDemoState from "../helpers/use-demo-state"

const StyledPresetTag = styled.button`
  background: ${props => (props.isSweep ? "var(--pink)" : "var(--cyan)")};
  color: black;
  border-radius: 3px;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem;
  margin: 0 0.25rem 0.25rem 0;
  cursor: pointer;
  opacity: ${props => (props.active ? 1 : 0.4)};

  transition: opacity 0.2s ease-in;

  @media (min-width: 600px) {
    font-size: 1.2rem;
  }
`

const Preset = ({ id = "", label = "", isSweep = false }) => {
  const { isPedalOn, activePreset, selectPreset, setIsPedalOn } = useDemoState()
  const isActive = id === activePreset.id && isPedalOn
  return (
    <StyledPresetTag
      active={isActive}
      isSweep={isSweep}
      type="button"
      onClick={() => {
        if (isActive) {
          setIsPedalOn(false)
        } else {
          selectPreset(id)
          setIsPedalOn(true)
        }
      }}
    >
      {label}
    </StyledPresetTag>
  )
}
export default Preset
