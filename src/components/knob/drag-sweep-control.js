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
  z-index: 1;
  --glow: ${props => (props.inactive ? "lightslategray" : "var(--pink)")};
  --size: ${props => props.size}px;
  width: var(--size);
  height: var(--size);

  &:after {
    position: absolute;
    top: -16px;
    left: -16px;
    content: " ";
    width: calc(var(--size) + 32px);
    height: calc(var(--size) + 32px);
    background: radial-gradient(
      var(--glow) calc(var(--size) / 2),
      rgba(0, 0, 0, 0) calc((var(--size) + 32px) / 2)
    );
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

  const { initialValue } = activePreset

  const [level, setLevel] = useState(initialValue || 0)

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

    const isTouch = Boolean(downEvent.touches)

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

    if (isTouch) {
      document.addEventListener("touchmove", throttledHandleDrag)
      document.addEventListener("touchend", () => {
        document.removeEventListener("touchmove", throttledHandleDrag)
      })
    } else {
      document.addEventListener("mousemove", throttledHandleDrag)
      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", throttledHandleDrag)
      })
    }
  }

  return (
    <SweepControlContainer
      inactive={!isSweepPresetLoaded}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      size={size}
      reverseInitAnimation={initialValue < 5}
    >
      {render(level)}
    </SweepControlContainer>
  )
}
export default DragSweepControl
