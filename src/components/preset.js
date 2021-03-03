import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faSpinner,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons"
import useDemoState from "../helpers/use-demo-state"

const StyledPresetTag = styled.button`
  flex: 0 0 auto;
  display: flex;
  align-items: center;

  background-color: ${props => (props.isSweep ? "var(--pink)" : "var(--cyan)")};
  color: black;
  border-radius: 3px;
  font-weight: 700;
  padding: 0 0.5rem;
  margin: 0 4px 4px 0;
  cursor: ${props => (props.isLoading ? "progress" : "pointer")};
  opacity: ${props => (props.active || props.hasError ? 1 : 0.4)};

  transition: opacity 0.2s ease-in, background-color 0.2s ease-in;

  font-size: 1rem;
  height: 36px;

  > span {
    font-size: 1rem;
  }

  @media (min-width: 600px) {
    font-size: 1.2rem;
    height: 42px;

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
    cursor: ${props => (props.isLoading ? "progress" : "not-allowed")};
  }
`

const Preset = ({ id = "", label = "", isSweep = false, ...rest }) => {
  const {
    demoType,
    getIsPedalOn,
    activePreset,
    activePedal,
    hasLoadingStarted,
    presetsLoaded,
    presetLoadingErrors,
    selectPreset,
    setIsPedalOn,
  } = useDemoState()

  const audioRelevantId = demoType === "single" ? id : rest[activePedal].id

  const isActive = id === activePreset.id && getIsPedalOn(activePedal)
  const loaded = presetsLoaded.includes(audioRelevantId)
  const hasError = presetLoadingErrors.includes(audioRelevantId)

  const renderIcon = () => {
    if (hasError) {
      return <FontAwesomeIcon icon={faExclamationTriangle} />
    }

    if (!loaded && hasLoadingStarted) {
      return <FontAwesomeIcon icon={faSpinner} spin />
    }

    return null
  }

  const handleClick = () => {
    if (isActive) {
      setIsPedalOn(activePedal, false)
    } else {
      selectPreset(id)
      setIsPedalOn(activePedal, true)
    }
  }

  return (
    <StyledPresetTag
      active={isActive}
      isSweep={isSweep}
      hasError={hasError}
      type="button"
      disabled={!loaded || hasError}
      isLoading={!loaded && hasLoadingStarted}
      onClick={handleClick}
    >
      <span>{label}</span>
      {renderIcon()}
    </StyledPresetTag>
  )
}
export default Preset
