import React from "react"
import Slider from "./slider"

const Toggle = ({ id, level }) => <div />

const ExternalControls = ({ controls = [] }) => {
  if (controls.length === 0) return null

  const toggles = controls.filter(({ type }) => type === "toggle")
  const sliders = controls.filter(({ type }) => type === "slider")

  return (
    <>
      <div>
        {toggles.map(({ id, isOn }) => (
          <Toggle isOn={isOn} id={id} key={id} />
        ))}
      </div>
      <div>
        {sliders.map(({ id, values, initialValue, label }) => (
          <Slider
            values={values}
            initialValue={initialValue}
            label={label}
            id={id}
            key={id}
          />
        ))}
      </div>
    </>
  )
}

export default ExternalControls
