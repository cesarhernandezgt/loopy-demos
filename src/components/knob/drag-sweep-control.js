import React, { useState, useEffect } from "react"
import { throttle } from "lodash"
import useDemoState from "../../helpers/use-demo-state"
import useDebouncedEffect from "../../helpers/use-debounced-effect"
import InteractionContainer from "../interaction-container"

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

const isBrowser = typeof window !== `undefined`

const DragSweepControl = ({
  id = "",
  render = () => {},
  size = 64,
  isRotary = false,
}) => {
  const {
    activePreset,
    presetsLoaded,
    sweepSetting,
    selectSweepSetting,
    setIsPedalOn,
  } = useDemoState()

  const { initialValue } = activePreset

  const [level, setLevel] = useState(initialValue || 0)

  const isSweepPresetLoaded =
    activePreset.isSweep &&
    activePreset.target === id &&
    presetsLoaded.includes(activePreset.id)

  useEffect(() => {
    setLevel(activePreset.initialValue)
  }, [activePreset])

  useDebouncedEffect(
    () => {
      selectSweepSetting(id, level)
      if (isSweepPresetLoaded) setIsPedalOn(true)
    },
    [level],
    100
  )

  const startDrag = downEvent => {
    if (!isBrowser || isRotary) return
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

  const handleClick = () => {
    if (!isRotary || !isSweepPresetLoaded) return

    const numValues = activePreset.values.length
    const currentValIndex = activePreset.values.findIndex(
      val => val === sweepSetting[id]
    )

    const nextIndex = (currentValIndex + 1) % numValues
    const nextValue = activePreset.values[nextIndex]
    selectSweepSetting(id, nextValue)
    setLevel(nextValue)
    setIsPedalOn(true)
  }

  return (
    <InteractionContainer
      color={
        isSweepPresetLoaded ? activePreset.highlightColor || "pink" : "gray"
      }
      size={size}
      extraCSS="touch-action: none;"
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      onClick={handleClick}
    >
      {render(level)}
    </InteractionContainer>
  )
}
export default DragSweepControl
