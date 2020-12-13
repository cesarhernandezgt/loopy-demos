import React from "react"
import Img from "gatsby-image"
import styled from "styled-components"
import Knob from "./knob"
import Led from "./svg/led"
import Switch from "./switch"
import LineLabel from "./line-label"
import useDemoState from "../helpers/use-demo-state"

const Enclosure = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  box-sizing: border-box;
  margin: 1rem auto 1rem;
  position: relative;
`

const setPositions = ({ id, position }) =>
  `
    > #${id} {
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
  knobs = [],
  switches = [],
  leds = [],
  labels = [],
  width = 350,
  height = 350,
  image = {},
}) => {
  const { isPedalOn, setIsPedalOn, activePreset, sweepSetting } = useDemoState()
  const sweep = activePreset.isSweep && activePreset
  const settings = activePreset.settings || sweepSetting

  return (
    <Enclosure width={width} height={height}>
      <Img
        fluid={image}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "0",
        }}
        imgStyle={{
          objectFit: "contain",
        }}
      />
      <ControlsLayout controls={[...knobs, ...switches, ...leds, ...labels]}>
        {knobs.map(({ size, id, type }) => (
          <Knob
            id={id}
            key={id}
            size={size}
            level={settings[id]}
            type={type}
            levelOptions={sweep?.target === id ? sweep.values : []}
          />
        ))}
        {leds.map(({ id, socket, colors, size }) => (
          <Led
            key={id}
            isOn={id === "on_led" ? isPedalOn : settings[id]}
            id={id}
            socket={socket}
            colors={colors}
            size={size}
          />
        ))}
        {switches.map(({ id, size, type }) => (
          <Switch
            key={id}
            id={id}
            type={type}
            size={size}
            state={settings[id]}
            onClick={() => {
              if (id === "bypass_switch") {
                setIsPedalOn(!isPedalOn)
              }
            }}
            isOn={id === "bypass_switch" && isPedalOn}
          />
        ))}
        {labels.map(({ id, position, labelPosition }) => (
          <LineLabel
            key={id}
            id={id}
            start={position}
            end={labelPosition}
            label={settings[id]}
          />
        ))}
      </ControlsLayout>
    </Enclosure>
  )
}

export default Pedal
