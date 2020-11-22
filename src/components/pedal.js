import React from "react"
import styled from "styled-components"
import Knob from "./knob"
import Led from "./svg/led"
import StompSwitch from "./svg/stomp-switch"

const Enclosure = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  box-sizing: border-box;
  margin: 0.5rem auto 1rem;
  position: relative;

  background: url(${props => props.image}) no-repeat;
  background-size: contain;
`

const setPositions = ({ id, position }) =>
  `
    > #${id} {
      z-index: 1;
      position: absolute;
      top: ${position?.top || 0}px;
      left: ${position?.left || 0}px;
    }
  `

const ControlsLayout = styled.div`
  width: 100%;
  position: relative;

  ${({ controls }) => controls.map(el => setPositions(el))}
`

const Pedal = ({
  config: { knobs, switches, leds, width, height, image } = {
    knobs: [],
    switches: [],
    leds: [],
    width: 250,
    height: 400,
    image: "",
  },
  settings = {},
  sweep = {},
  onSelectSweep = () => {},
  isOn = false,
  onToggleOn = () => {},
}) => (
  <Enclosure width={width} height={height} image={image}>
    <ControlsLayout controls={[...knobs, ...switches, ...leds]}>
      {knobs.map(({ size, id, type }) => (
        <Knob
          id={id}
          key={id}
          size={size}
          level={settings[id]}
          type={type}
          onSelectOption={onSelectSweep}
          levelOptions={sweep?.target === id ? sweep.values : []}
        />
      ))}
      {leds.map(({ id, socket, colors, size }) => (
        <Led isOn={isOn} id={id} socket={socket} colors={colors} size={size} />
      ))}
      {switches.map(({ id, size }) => (
        <StompSwitch
          id={id}
          size={size}
          onClick={() => {
            onToggleOn(!isOn)
          }}
          isOn={isOn}
        />
      ))}
    </ControlsLayout>
  </Enclosure>
)

export default Pedal
