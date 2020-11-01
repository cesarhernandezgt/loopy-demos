import React from "react"
import styled from "styled-components"

import Knob from "./knob"
import Led from "./svg/led"

const StyledPedalContainer = styled.div`
  padding: 2rem 1rem;
  width: 300px;
  box-sizing: border-box;
  margin: 0 auto;
  border-radius: 10px;

  background: #0b4c74;
`

const StyledKnobGrid = styled.div`
  height: 250px;
  width: 100%;
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  grid-template-rows: 33.33% 33.33% 33.33%;

  & :nth-child(1) {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
  }
  & :nth-child(2) {
    grid-column: 3 / span 1;
    grid-row: 1 / span 1;
  }
  & :nth-child(3) {
    grid-column: 2 / span 1;
    grid-row: 2 / span 1;
  }
  & :nth-child(4) {
    grid-column: 1 / span 1;
    grid-row: 3 / span 1;
  }
  & :nth-child(5) {
    grid-column: 3 / span 1;
    grid-row: 3 / span 1;
  }

  > * {
    align-self: center;
    justify-self: center;
  }
`

const StyledBottomRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`

const Pedal = () => (
  <StyledPedalContainer>
    <StyledKnobGrid>
      <Knob label="Gain" level={10} type="offset" />
      <Knob label="Volume" level={5} />
      <Knob label="Bias" level={3} size={48} />
      <Knob label="Bass" level={0} size={48} />
      <Knob label="Treble" size={48} />
    </StyledKnobGrid>
    <StyledBottomRow>
      <Led isOn />
    </StyledBottomRow>
  </StyledPedalContainer>
)

export default Pedal
