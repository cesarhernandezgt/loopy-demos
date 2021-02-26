import React, { useRef } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faSpinner,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons"
import useDemoState from "../helpers/use-demo-state"

const StyledPresetTag = styled.button`
  flex: 1 0 auto;
  height: 42px;
  scroll-snap-align: start;

  background-color: ${props => (props.isSweep ? "var(--pink)" : "var(--cyan)")};
  color: black;
  border-radius: 3px;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem;
  margin-right: 0.25rem;
  cursor: ${props => (props.isLoading ? "progress" : "pointer")};
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
    cursor: ${props => (props.isLoading ? "progress" : "not-allowed")};
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

  const itemRef = useRef(null)

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
      setIsPedalOn(false)
    } else {
      selectPreset(id)
      setIsPedalOn(true)
    }

    itemRef.current.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    })
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
      ref={itemRef}
    >
      <span>{label}</span>
      {renderIcon()}
    </StyledPresetTag>
  )
}
export default Preset
