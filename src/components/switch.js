import React from "react"
import StompSwitch from "./svg/stomp-switch"
import ToggleSwitch from "./svg/toggle-switch"

const Switch = ({
  id = "",
  size = 64,
  type = "stomp",
  onClick = () => {},
  isOn = false,
  state = 1,
}) => (
  <div id={id}>
    {
      {
        stomp: <StompSwitch size={size} onClick={onClick} isOn={isOn} />,
        toggle: <ToggleSwitch size={size} state={state} />,
      }[type]
    }
  </div>
)

export default Switch
