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
  position: relative;
  z-index: 0;

  svg g {
    transform: rotate(var(--rotation));
    transform-origin: 50% 50%;
    ${props => !props.noTransition && `transition: transform 0.2s ease-in;`}
  }
`

const Knob = ({
  id = "",
  size = 64,
  level = 5,
  type = "bakelit",
  isSweep = false,
}) => {
  const renderKnob = internalLevel => (
    <StyledKnobContainer
      rotation={levelToRotationFunc(internalLevel)}
      id={id}
      noTransition={isSweep}
    >
      {
        {
          bakelit: <BakelitKnob size={size} />,
          knurled: <KnurledKnob size={size} />,
          offset: <OffsetKnob size={size} />,
          walrus: <WalrusAudioKnob size={size} />,
          witchhat: <WalrusAudioKnob size={size} />,
        }[type]
      }
    </StyledKnobContainer>
  )

  return isSweep ? (
    <DragSweepControl id={id} render={renderKnob} />
  ) : (
    renderKnob(level)
  )
}

export default Knob
