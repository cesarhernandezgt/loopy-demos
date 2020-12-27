import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import useDemoState from "../helpers/use-demo-state"

const StyledPresetTag = styled.button`
  background-color: ${props => (props.isSweep ? "var(--pink)" : "var(--cyan)")};
  color: black;
  border-radius: 3px;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem;
  margin: 0 0.25rem 0.25rem 0;
  cursor: pointer;
  opacity: ${props => (props.active ? 1 : 0.4)};

  transition: opacity 0.2s ease-in, background-color 0.2s ease-in;

  @media (min-width: 600px) {
    font-size: 1.2rem;
  }

  > span {
    font-size: 1.1rem;
  }

  @media (min-width: 600px) {
    > span {
      font-size: 1.2rem;
    }
  }

  > span:not(:last-child) {
    margin-right: 0.5rem;
  }

  :disabled {
    background-color: lightslategray;
    cursor: progress;
  }
`

const Preset = ({ id = "", label = "", isSweep = false }) => {
  const {
    isPedalOn,
    activePreset,
    hasLoadingStarted,
    presetsLoaded,
    selectPreset,
    setIsPedalOn,
  } = useDemoState()

  const isActive = id === activePreset.id && isPedalOn
  const loaded = presetsLoaded.includes(id)

  return (
    <StyledPresetTag
      active={isActive}
      isSweep={isSweep}
      type="button"
      disabled={!loaded}
      onClick={() => {
        if (isActive) {
          setIsPedalOn(false)
        } else {
          selectPreset(id)
          setIsPedalOn(true)
        }
      }}
    >
      <span>{label}</span>
      {!loaded && hasLoadingStarted && (
        <FontAwesomeIcon icon={faSpinner} spin />
      )}
    </StyledPresetTag>
  )
}
export default Preset
