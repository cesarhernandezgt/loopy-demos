import React from "react"
import styled from "styled-components"

import DragSweepControl from "./drag-sweep-control"
import BakelitKnob from "./bakelit-knob"
import KnurledKnob from "./knurled-knob"
import OffsetKnob from "./offset-knob"
import WalrusAudioKnob from "./walrus-audio-knob"

const levelToRotationFunc = level => `${30 * level - 150}deg`

const StyledKnobContainer = styled.div`
  --rotation: ${({ rotation }) => rotation};
  --size: ${({ size }) => size}px;
  position: relative;
  z-index: 0;

  width: var(--size);
  height: var(--size);

  svg g {
    transform: rotate(var(--rotation));
    transform-origin: 50% 50%;
    ${props => !props.noTransition && `transition: transform 0.2s ease-in;`}
  }
`

const StyledPositionContainer = styled.div`
  z-index: 0;
  width: ${props => props.size}px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`

const StyledLabel = styled.span`
  font-size: 1rem;
  line-height: 1rem;
  margin-top: 0.7rem;
  text-align: center;
`

const Knob = ({
  id = "",
  size = 64,
  level = 5,
  type = "bakelit",
  isSweep = false,
  label = "",
}) => {
  const renderKnob = internalLevel => (
    <StyledKnobContainer
      rotation={levelToRotationFunc(internalLevel)}
      noTransition={isSweep}
      size={size}
    >
      {
        {
          bakelit: <BakelitKnob size={size} />,
          knurled: <KnurledKnob size={size} />,
          offset: <OffsetKnob size={size} />,
          walrus: <WalrusAudioKnob size={size} />,
        }[type]
      }
    </StyledKnobContainer>
  )

  return (
    <StyledPositionContainer id={id} size={size}>
      {isSweep ? (
        <DragSweepControl id={id} render={renderKnob} size={size} />
      ) : (
        renderKnob(level)
      )}
      {label.length > 0 && <StyledLabel>{label}</StyledLabel>}
    </StyledPositionContainer>
  )
}

export default Knob
