import React, { useState } from "react"
import styled from "styled-components"

import Knob from "./knob"
import Led from "./svg/led"
import StompSwitch from "./svg/stomp-switch"

const StyledPedalContainer = styled.div`
  padding: 0.5rem 1rem 2rem;
  width: 250px;
  box-sizing: border-box;
  margin: 0.5rem auto 1rem;
  border-radius: 10px;
  position: relative;

  background: #1660b4;
`

const StyledControlsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  grid-template-rows: repeat(3, 70px) 180px;

  > :nth-child(1) {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
  }
  > :nth-child(2) {
    grid-column: 3 / span 1;
    grid-row: 1 / span 1;
  }
  > :nth-child(3) {
    grid-column: 2 / span 1;
    grid-row: 2 / span 1;
  }
  > :nth-child(4) {
    grid-column: 1 / span 1;
    grid-row: 3 / span 1;
  }
  > :nth-child(5) {
    grid-column: 3 / span 1;
    grid-row: 3 / span 1;
  }
  > :nth-child(6) {
    grid-column: 2 / span 1;
    grid-row: 3 / span 1;
  }
  > :nth-child(7) {
    grid-column: 2 / span 1;
    grid-row: 4 / span 1;
  }

  > * {
    align-self: center;
    justify-self: center;
    z-index: 1;
  }

  > :last-child {
    align-self: flex-end;
  }
`

const Pedal = ({
  config = { knobs: [] },
  settings = {},
  sweep = {},
  onSelectSweep = () => {},
  isOn = false,
  onToggleOn = () => {},
}) => (
  <StyledPedalContainer>
    <StyledControlsGrid>
      {config.knobs.map(({ label, size, id }) => (
        <Knob
          id={id}
          key={id}
          label={label}
          size={size}
          level={settings[id]}
          onSelectOption={onSelectSweep}
          levelOptions={sweep?.target === id ? sweep.values : []}
        />
      ))}
      <Led isOn={isOn} />
      <StompSwitch
        onClick={() => {
          onToggleOn(!isOn)
        }}
        isOn={isOn}
      />
    </StyledControlsGrid>
  </StyledPedalContainer>
)

export default Pedal
