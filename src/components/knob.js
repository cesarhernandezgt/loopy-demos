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

/**
 * For the knobs to align with their respective centers,
 * the label (1rem) and its top margin (0.5rem) need to be
 * offset.
 */
const marginTop = "1.5rem"

const StyledKnobContainer = styled.div`
  --rotation: ${({ rotation }) => rotation};
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  position: relative;

  > svg {
    transform: rotate(var(--rotation));
    margin-top: ${marginTop};
    transition: transform 0.2s ease-in;
  }

  > span {
    color: white;
    margin-top: 0.5rem;
  }
`

const StyledDotButton = styled.div`
  --parentSize: ${({ parentSize }) => parentSize}px;
  --dotSize: 0.5rem;
  --rotation: ${({ level }) => level};
  border-radius: 50%;
  width: var(--dotSize);
  height: var(--dotSize);
  background: #80ffea;
  position: absolute;
  top: calc(var(--dotSize) / 2);
  left: calc(50% - (var(--dotSize) / 2));
  transform-origin: calc(var(--dotSize) / 2)
    calc((var(--parentSize) - var(--dotSize)) / 2 + ${marginTop});
  transform: rotate(var(--rotation));
  cursor: pointer;

  :after {
    content: " ";
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    border: 2px solid #80ffea;
    box-sizing: border-box;
    position: absolute;
    top: -0.25rem;
    left: -0.25rem;
    animation: var(--blinkAnimation);
  }
`

const Knob = ({
  id = "",
  size = 64,
  label = "",
  level = 5,
  type = "bakelit",
  onSelectOption = () => {},
  levelOptions = [],
}) => (
  <StyledKnobContainer rotation={levelToRotationMap[level]}>
    {
      {
        bakelit: <BakelitKnob size={size} />,
        offset: <OffsetKnob size={size} />,
      }[type]
    }
    <span>{label}</span>
    {levelOptions.map(levelOption => (
      <StyledDotButton
        parentSize={size}
        onClick={() => {
          onSelectOption({ [id]: levelOption })
        }}
        level={levelToRotationMap[levelOption]}
      />
    ))}
  </StyledKnobContainer>
)

export default Knob
