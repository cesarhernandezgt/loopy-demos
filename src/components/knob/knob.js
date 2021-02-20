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
import SimpleKnob from "./simple-knob"
import ChickenHeadKnob from "./chicken-head-knob"
import useDemoState from "../../helpers/use-demo-state"

const StyledKnobContainer = styled.div`
  --rotation: ${({ rotation }) => rotation};
  --animRotation: ${props => (props.reverseInitAnimation ? "30deg" : "-30deg")};
  --size: ${({ size }) => size}px;
  position: relative;
  z-index: ${props => (props.isSweep ? 10 : 0)};

  width: var(--size);
  height: var(--size);

  ${props =>
    props.isSweep && !props.isRotary
      ? "animation: wiggle 1s linear 1 forwards;"
      : ""}

  svg g {
    transform: rotate(var(--rotation));
    transform-origin: 50% 50%;
    ${props =>
      !props.isSweep &&
      !props.isRotary &&
      `transition: transform 0.2s ease-in;`}
  }

  @keyframes wiggle {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(var(--animRotation));
    }
    50% {
      transform: rotate(0deg);
    }
    75% {
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
  animation: bounce 1s linear 1 forwards;
  z-index: 10;

  @keyframes bounce {
    0% {
      transform: translateY(0px);
    }
    25% {
      transform: translateY(-8px);
    }
    50% {
      transform: translateY(0px);
    }
    75% {
      transform: translateY(-8px);
    }
    95% {
      opacity: 1;
      z-index: 10;
    }
    100% {
      transform: translateY(0px);
      opacity: 0;
      z-index: -99;
    }
  }
`
const levelToRotationFunc = ({ level, isRotary, rotaryAngles }) =>
  isRotary ? `${rotaryAngles[level - 1]}deg` : `${30 * level - 150}deg`

const Knob = ({
  id = "",
  size = 64,
  level = 5,
  type = "bakelit",
  isSweep = false,
  label = "",
  isRotary = false,
  rotaryAngles = [],
  ...rest
}) => {
  const { activePreset } = useDemoState()
  const { initialValue } = activePreset

  const renderKnob = internalLevel => (
    <>
      <StyledKnobContainer
        rotation={levelToRotationFunc({
          level: internalLevel,
          isRotary,
          rotaryAngles,
        })}
        isSweep={isSweep}
        size={size}
        isRotary={isRotary}
        reverseInitAnimation={initialValue < 5}
      >
        {
          {
            bakelit: <BakelitKnob size={size} {...rest} />,
            knurled: <KnurledKnob size={size} {...rest} />,
            offset: <OffsetKnob size={size} {...rest} />,
            walrus: <WalrusAudioKnob size={size} {...rest} />,
            jhs: <JhsKnob size={size} {...rest} />,
            simple: <SimpleKnob size={size} {...rest} />,
            chicken: <ChickenHeadKnob size={size} {...rest} />,
          }[type]
        }
      </StyledKnobContainer>
      {isSweep && !isRotary && (
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
          isRotary={isRotary}
        />
      ) : (
        renderKnob(level)
      )}
      {label.length > 0 && <StyledLabel>{label}</StyledLabel>}
    </StyledPositionContainer>
  )
}

export default Knob
