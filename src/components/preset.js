import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faSpinner,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons"
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
  opacity: ${props => (props.active || props.hasError ? 1 : 0.4)};

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
    background-color: ${props =>
      props.hasError ? "var(--red)" : "var(--gray)"};
    cursor: progress;
  }
`

const Preset = ({ id = "", label = "", isSweep = false }) => {
  const {
    isPedalOn,
    activePreset,
    hasLoadingStarted,
    presetsLoaded,
    presetLoadingErrors,
    selectPreset,
    setIsPedalOn,
  } = useDemoState()

  const isActive = id === activePreset.id && isPedalOn
  const loaded = presetsLoaded.includes(id)
  const hasError = presetLoadingErrors.includes(id)

  const renderIcon = () => {
    if (hasError) {
      return <FontAwesomeIcon icon={faExclamationTriangle} />
    }

    if (!loaded && hasLoadingStarted) {
      return <FontAwesomeIcon icon={faSpinner} spin />
    }

    return null
  }

  return (
    <StyledPresetTag
      active={isActive}
      isSweep={isSweep}
      hasError={hasError}
      type="button"
      disabled={!loaded || hasError}
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
      {renderIcon()}
    </StyledPresetTag>
  )
}
export default Preset
