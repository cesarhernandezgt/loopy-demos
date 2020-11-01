import React from "react"
import styled from "styled-components"

import BakelitKnob from "./svg/bakelit-knob"
import OffsetKnob from "./svg/offset-knob"

const levelToRotationMap = [
  "-150deg",
  "-120deg",
  "-90deg",
  "-60deg",
  "-30deg",
  "0deg",
  "30deg",
  "60deg",
  "90deg",
  "120deg",
  "150deg",
]

const StyledKnobContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  > svg {
    transform: rotate(${({ rotation }) => rotation});
  }

  > span {
    color: white;
    margin-top: 0.5rem;
  }
`

const Knob = ({ size = 64, label = "", level = 5, type = "bakelit" }) => (
  <StyledKnobContainer rotation={levelToRotationMap[level]}>
    {
      {
        bakelit: <BakelitKnob size={size} />,
        offset: <OffsetKnob size={size} />,
      }[type]
    }
    <span>{label}</span>
  </StyledKnobContainer>
)

export default Knob
