import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHandPointUp } from "@fortawesome/free-solid-svg-icons"

import DragSweepControl from "./drag-sweep-control"
import BakelitKnob from "./bakelit-knob"
import KnurledKnob from "./knurled-knob"
import OffsetKnob from "./offset-knob"
import WalrusAudioKnob from "./walrus-audio-knob"
import JhsKnob from "./jhs-knob"
import useDemoState from "../../helpers/use-demo-state"

const levelToRotationFunc = level => `${30 * level - 150}deg`

const StyledKnobContainer = styled.div`
  --rotation: ${({ rotation }) => rotation};
  --animRotation: ${props => (props.reverseInitAnimation ? "30deg" : "-30deg")};
  --size: ${({ size }) => size}px;
  position: relative;
  z-index: ${props => (props.isSweep ? 10 : 0)};

  width: var(--size);
  height: var(--size);

  ${props => (props.isSweep ? "animation: wiggle 2s linear 1 forwards;" : "")}

  svg g {
    transform: rotate(var(--rotation));
    transform-origin: 50% 50%;
    ${props => !props.isSweep && `transition: transform 0.2s ease-in;`}
  }

  @keyframes wiggle {
    0% {
      transform: rotate(0deg);
    }
    16% {
      transform: rotate(var(--animRotation));
    }
    33% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(var(--animRotation));
    }
    66% {
      transform: rotate(0deg);
    }
    82% {
      transform: rotate(var(--animRotation));
    }
    100% {
      transform: rotate(0deg);
    }
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

const AnimatedIcon = styled(FontAwesomeIcon)`
  position: absolute;
  bottom: -1rem;
  ${props => props.alignment}: 0rem;
  font-size: 2rem;
  color: var(--cyan);
  animation: bounce 2s linear 1 forwards;
  z-index: 10;

  @keyframes bounce {
    0% {
      transform: translateY(0px);
    }
    16% {
      transform: translateY(-8px);
    }
    33% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-8px);
    }
    66% {
      transform: translateY(0px);
    }
    82% {
      transform: translateY(-8px);
    }
    95% {
      opacity: 1;
    }
    100% {
      transform: translateY(0px);
      opacity: 0;
    }
  }
`

const Knob = ({
  id = "",
  size = 64,
  level = 5,
  type = "bakelit",
  isSweep = false,
  label = "",
  colors = {},
}) => {
  const { activePreset } = useDemoState()
  const { initialValue } = activePreset

  const renderKnob = internalLevel => (
    <>
      <StyledKnobContainer
        rotation={levelToRotationFunc(internalLevel)}
        isSweep={isSweep}
        size={size}
        reverseInitAnimation={initialValue < 5}
      >
        {
          {
            bakelit: <BakelitKnob size={size} />,
            knurled: <KnurledKnob size={size} />,
            offset: <OffsetKnob size={size} />,
            walrus: <WalrusAudioKnob size={size} />,
            jhs: <JhsKnob size={size} colors={colors} />,
          }[type]
        }
      </StyledKnobContainer>
      {isSweep && (
        <AnimatedIcon
          icon={faHandPointUp}
          alignment={initialValue < 5 ? "left" : "right"}
        />
      )}
    </>
  )

  return (
    <StyledPositionContainer id={id} size={size}>
      {isSweep ? (
        <DragSweepControl
          id={id}
          render={renderKnob}
          size={size}
          initialValue={activePreset.initialValue}
        />
      ) : (
        renderKnob(level)
      )}
      {label.length > 0 && <StyledLabel>{label}</StyledLabel>}
    </StyledPositionContainer>
  )
}

export default Knob
