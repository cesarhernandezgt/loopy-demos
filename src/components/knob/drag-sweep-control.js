import React, { useState } from "react"
import { throttle } from "lodash"
import styled from "styled-components"
import useDemoState from "../../helpers/use-demo-state"
import useDebouncedEffect from "../../helpers/use-debounced-effect"

const rotationToLevel = angle => (angle + 150) / 30

const calcAngle = (centerX, centerY, clientX, clientY) => {
  const modifier = clientY > centerY ? 180 * Math.sign(clientX - centerX) : 0

  let angle =
    (Math.atan((clientX - centerX) / (centerY - clientY)) * 180) / Math.PI +
    modifier

  angle = Math.min(150, angle)
  angle = Math.max(-150, angle)

  return angle
}

const SweepControlContainer = styled.div`
  touch-action: none;
  position: relative;
  z-index: 0;
  --glow: ${props => (props.inactive ? "lightslategray" : "var(--pink)")};
  --size: ${props => props.size}px;
  width: var(--size);
  height: var(--size);

  &:after {
    position: absolute;
    top: -12px;
    left: -12px;
    content: " ";
    width: calc(var(--size) + 24px);
    height: calc(var(--size) + 24px);
    background: radial-gradient(var(--glow) 47%, rgba(0, 0, 0, 0) 70%);
    border-radius: 50%;
    z-index: -1;
  }
`

const isBrowser = typeof window !== `undefined`

const DragSweepControl = ({ id = "", render = () => {}, size = 64 }) => {
  const {
    activePreset,
    presetsLoaded,
    selectSweepSetting,
    setIsPedalOn,
  } = useDemoState()

  const [level, setLevel] = useState(
    activePreset.isSweep && activePreset.target === id
      ? activePreset.initialValue
      : 0
  )

  const isSweepPresetLoaded =
    activePreset.isSweep &&
    activePreset.target === id &&
    presetsLoaded.includes(activePreset.id)

  useDebouncedEffect(
    () => {
      selectSweepSetting(id, level)
      if (isSweepPresetLoaded) setIsPedalOn(true)
    },
    [level],
    100
  )

  const startDrag = downEvent => {
    if (!isBrowser) return
    downEvent.preventDefault()

    const {
      left,
      top,
      bottom,
      right,
    } = downEvent.target.getBoundingClientRect()

    const startX = downEvent.clientX || downEvent.touches[0].clientX
    const startY = downEvent.clientY || downEvent.touches[0].clientY

    const centerX = (right + left) / 2
    const centerY = (bottom + top) / 2

    const startAngle = calcAngle(centerX, centerY, startX, startY)
    const startLevel = rotationToLevel(startAngle)
    setLevel(startLevel)

    const handleDrag = moveEvent => {
      moveEvent.preventDefault()
      const clientX = moveEvent.clientX || moveEvent.touches[0].clientX
      const clientY = moveEvent.clientY || moveEvent.touches[0].clientY

      const angle = calcAngle(centerX, centerY, clientX, clientY)
      const nextLevel = rotationToLevel(angle)
      setLevel(nextLevel)
    }

    const throttledHandleDrag = throttle(handleDrag, 100)
    window.addEventListener("mousemove", throttledHandleDrag)
    window.addEventListener("touchmove", throttledHandleDrag, {
      passive: false,
    })
    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", throttledHandleDrag)
    })
    window.addEventListener("touchend touchcancel", () => {
      window.removeEventListener("touchmove", throttledHandleDrag)
    })
  }

  return (
    <SweepControlContainer
      inactive={!isSweepPresetLoaded}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      size={size}
    >
      {render(level)}
    </SweepControlContainer>
  )
}
export default DragSweepControl
