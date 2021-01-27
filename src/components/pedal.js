import React from "react"
import Img from "gatsby-image"
import styled from "styled-components"
import Knob from "./knob"
import Led from "./svg/led"
import Switch from "./switch"
import LineLabel from "./line-label"
import useDemoState from "../helpers/use-demo-state"

const Enclosure = styled.div`
  width: ${props => props.width * props.scale}px;
  height: ${props => props.height * props.scale}px;
  box-sizing: border-box;
  position: relative;
`

const setPositions = ({ id, position }, scale) =>
  `
    > #${id} {
      position: absolute;
      top: ${position?.top * scale || 0}px;
      left: ${position?.left * scale || 0}px;
    }
  `

const ControlsLayout = styled.div`
  width: 100%;
  position: relative;

  ${({ controls, scale }) => controls.map(el => setPositions(el, scale))}
`

const Pedal = ({
  knobs = [],
  switches = [],
  leds = [],
  labels = [],
  width = 300,
  height = 350,
  image = {},
  alignment = "center",
  scale = 1,
  name = "",
}) => {
  const { isPedalOn, activePreset, sweepSetting } = useDemoState()
  const sweep = activePreset.isSweep && activePreset

  const getSettings = id => activePreset?.settings?.[id] || sweepSetting?.[id]

  return (
    <Enclosure width={width} height={height} scale={scale}>
      <Img
        fluid={image}
        style={{
          height: "100%",
          position: "absolute",
          top: "0",
          width: ["left", "right"].includes(alignment) ? "50%" : "100%",
          [alignment === "right" ? "right" : "left"]: "0",
          zIndex: "0",
        }}
        imgStyle={{
          objectFit: "contain",
        }}
      />
      <ControlsLayout
        controls={[...knobs, ...switches, ...leds, ...labels]}
        scale={scale}
      >
        {knobs.map(({ size, id, type, label, colors }) => (
          <Knob
            id={id}
            key={id}
            size={size * scale}
            level={getSettings(id)}
            type={type}
            isSweep={sweep?.target === id}
            label={label}
            colors={colors}
          />
        ))}
        {leds.map(({ id, socket, colors, size, isBlinking }) => (
          <Led
            key={id}
            isOn={id === "on_led" && isPedalOn(name)}
            id={id}
            socket={socket}
            colors={colors}
            size={size * scale}
            isBlinking={isBlinking}
            blinkTime={getSettings(id)}
          />
        ))}
        {switches.map(({ id, size, type, orientation }) => (
          <Switch
            key={id}
            id={id}
            type={type}
            size={size * scale}
            orientation={orientation}
            state={getSettings(id)}
            isSweep={sweep?.target === id}
          />
        ))}
        {labels
          .filter(({ id }) => Boolean(getSettings(id)))
          .map(({ id, position, labelPosition }) => (
            <LineLabel
              key={id}
              id={id}
              start={position}
              end={labelPosition}
              label={getSettings(id)}
            />
          ))}
      </ControlsLayout>
    </Enclosure>
  )
}

export default Pedal
