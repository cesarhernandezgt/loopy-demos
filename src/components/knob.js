import React from "react"
import styled from "styled-components"
import useDemoState from "../helpers/use-demo-state"

import BakelitKnob from "./svg/bakelit-knob"
import KnurledKnob from "./svg/knurled-knob"
import OffsetKnob from "./svg/offset-knob"
import WalrusAudioKnob from "./svg/walrus-audio-knob"

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
  --rotation: ${({ rotation }) => rotation};
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  position: relative;
  z-index: ${props => (props.isSweep ? 1 : 0)};

  svg g {
    transform: rotate(var(--rotation));
    transform-origin: 50% 50%;
    transition: transform 0.2s ease-in;
  }

  > span {
    color: white;
    margin-top: 0.5rem;
  }
`

const StyledDotButton = styled.div`
  --parentSize: ${({ parentSize }) => parentSize}px;
  --dotSize: 18px;
  --rotation: ${({ level }) => level};
  --spreadRadius: 28px;

  width: var(--dotSize);
  height: var(--dotSize);
  box-sizing: border-box;
  cursor: pointer;
  z-index: 99;
  border: 4px solid var(--cyan);
  border-radius: 50%;

  background: ${props => (props.isActive ? "var(--cyan)" : "none")};
  transition: background 200ms ease;
  animation: var(--blinkAnimation);

  position: absolute;
  top: calc((var(--dotSize) / 2) - var(--spreadRadius));
  left: calc(50% - (var(--dotSize) / 2));
  transform-origin: calc(var(--dotSize) / 2)
    calc((var(--parentSize) - var(--dotSize)) / 2 + var(--spreadRadius));
  transform: rotate(var(--rotation));
`

const Knob = ({
  id = "",
  size = 64,
  level = 5,
  type = "bakelit",
  levelOptions = [],
}) => {
  const { sweepSetting, selectSweepSetting, setIsPedalOn } = useDemoState()

  return (
    <StyledKnobContainer
      rotation={levelToRotationMap[level]}
      id={id}
      isSweep={levelOptions.length > 0}
    >
      {
        {
          bakelit: <BakelitKnob size={size} />,
          knurled: <KnurledKnob size={size} />,
          offset: <OffsetKnob size={size} />,
          walrus: <WalrusAudioKnob size={size} />,
        }[type]
      }
      {levelOptions.map(levelOption => (
        <StyledDotButton
          key={levelOption}
          parentSize={size}
          isActive={levelOption === sweepSetting[id]}
          onClick={() => {
            selectSweepSetting(id, levelOption)
            setIsPedalOn(true)
          }}
          level={levelToRotationMap[levelOption]}
        />
      ))}
    </StyledKnobContainer>
  )
}

export default Knob
