import React from "react"

import Knob from "./knob"
import Led from "./svg/led"
import StompSwitch from "./svg/stomp-switch"

const Pedal = ({
  config: { knobs, Enclosure, ControlsLayout } = {
    knobs: [],
    Enclosure: () => {},
    ControlsLayout: () => {},
  },
  settings = {},
  sweep = {},
  onSelectSweep = () => {},
  isOn = false,
  onToggleOn = () => {},
}) => (
  <Enclosure>
    <ControlsLayout>
      {knobs.map(({ label, size, id }) => (
        <Knob
          id={id}
          key={id}
          label={label}
          size={size}
          level={settings[id]}
          onSelectOption={onSelectSweep}
          levelOptions={sweep?.target === id ? sweep.values : []}
        />
      ))}
      <Led isOn={isOn} />
      <StompSwitch
        onClick={() => {
          onToggleOn(!isOn)
        }}
        isOn={isOn}
      />
    </ControlsLayout>
  </Enclosure>
)

export default Pedal
