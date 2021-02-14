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
  margin: 1rem auto 2rem;
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
  dependencies = [],
  width = 300,
  height = 350,
  image = {},
  alignment = "center",
}) => {
  const { isPedalOn, activePreset, sweepSetting } = useDemoState()
  const sweep = activePreset.isSweep && activePreset

  const getSettings = id => {
    const activeValue = activePreset?.settings?.[id]

    return typeof activeValue !== "undefined" ? activeValue : sweepSetting?.[id]
  }

  const getDependencyValue = (id, property) => {
    if (dependencies.length === 0) return null

    const dependency = dependencies.find(({ target }) => target.id === id)
    const sourceId = dependency.source
    const currentSourceValue = getSettings(sourceId)
    const dependencyValue = dependency.target.values.find(
      ({ sourceValue }) => sourceValue === currentSourceValue
    )

    return dependencyValue?.[property]
  }

  return (
    <Enclosure width={width} height={height}>
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
      <ControlsLayout controls={[...knobs, ...switches, ...leds, ...labels]}>
        {knobs.map(({ size, id, type, label, colors, ...rest }) => (
          <Knob
            id={id}
            key={id}
            size={size}
            level={getSettings(id)}
            type={type}
            isSweep={sweep?.target === id}
            label={label}
            colors={colors}
            {...rest}
          />
        ))}
        {leds.map(({ id, socket, colors, size, isBlinking }) => (
          <Led
            key={id}
            isOn={id === "on_led" && isPedalOn}
            id={id}
            socket={socket}
            colors={getDependencyValue(id, "colors") || colors}
            size={size}
            isBlinking={isBlinking}
            blinkTime={getSettings(id)}
          />
        ))}
        {switches.map(({ id, size, type, orientation }) => (
          <Switch
            key={id}
            id={id}
            type={type}
            size={size}
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
