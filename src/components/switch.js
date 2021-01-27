import React from "react"
import InteractionContainer from "./interaction-container"
import StompSwitch from "./svg/stomp-switch"
import ToggleSwitch from "./svg/toggle-switch"
import SlideSwitch from "./svg/slide-switch"
import useDemoState from "../helpers/use-demo-state"

const Switch = ({
  id = "",
  size = 64,
  type = "stomp",
  isSweep = false,
  state = 1,
  orientation = "vertical",
}) => {
  const {
    activePreset,
    presetsLoaded,
    isPedalOn,
    selectSweepSetting,
    setIsPedalOn,
  } = useDemoState()

  const isSweepPresetLoaded =
    activePreset.isSweep &&
    activePreset.target === id &&
    presetsLoaded.includes(activePreset.id)

  const onToggleSweepClick = () => {
    if (!isSweepPresetLoaded) return

    const numValues = activePreset.values.length
    const currentValIndex = activePreset.values.findIndex(val => val === state)
    const nextIndex = (currentValIndex + 1) % numValues
    const nextValue = activePreset.values[nextIndex]
    selectSweepSetting(id, nextValue)
    setIsPedalOn(true)
  }

  return (
    <div id={id}>
      {
        {
          stomp: (
            <InteractionContainer
              size={size}
              color="cyan"
              isHidden={isPedalOn || id !== "bypass_switch"}
            >
              <StompSwitch
                size={size}
                onClick={() => {
                  if (id === "bypass_switch") {
                    setIsPedalOn(!isPedalOn)
                  }
                }}
              />
            </InteractionContainer>
          ),
          toggle: (
            <InteractionContainer
              size={size}
              isHidden={!isSweep}
              color={isSweepPresetLoaded ? "pink" : "gray"}
              disabled={!isSweepPresetLoaded}
              onClick={onToggleSweepClick}
            >
              <ToggleSwitch
                size={size}
                state={state}
                orientation={orientation}
              />
            </InteractionContainer>
          ),
          slide: (
            <InteractionContainer
              size={size}
              isHidden={!isSweep}
              color={isSweepPresetLoaded ? "pink" : "gray"}
              disabled={!isSweepPresetLoaded}
              onClick={onToggleSweepClick}
            >
              <SlideSwitch size={size} state={state} />,
            </InteractionContainer>
          ),
        }[type]
      }
    </div>
  )
}
export default Switch
