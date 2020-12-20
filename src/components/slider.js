import React, { useState } from "react"
import { throttle } from "lodash"
import styled from "styled-components"
import useDemoState from "../helpers/use-demo-state"
import useDebouncedEffect from "../helpers/use-debounced-effect"
import Knob from "./knob"

const rotationToLevel = angle => (angle + 150) / 30

const SweepControlContainer = styled.div`
  display: flex;
  align-items: center;
  touch-action: none;
`

const StyledLabel = styled.label`
  font-size: 1.3rem;
  margin-right: 1rem;
`

const isBrowser = typeof window !== `undefined`

const Slider = ({ id = "", label = "" }) => {
  const { activePreset, selectSweepSetting } = useDemoState()
  const [level, setLevel] = useState(
    activePreset.isSweep && activePreset.target === id
      ? activePreset.initialValue
      : 0
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

    const centerX = (right + left) / 2
    const centerY = (bottom + top) / 2

    const handleDrag = moveEvent => {
      moveEvent.preventDefault()
      const clientX = moveEvent.clientX || moveEvent.touches[0].clientX
      const clientY = moveEvent.clientY || moveEvent.touches[0].clientY

      const modifier =
        clientY > centerY ? 180 * Math.sign(clientX - centerX) : 0

      let angle =
        (Math.atan((clientX - centerX) / (centerY - clientY)) * 180) / Math.PI +
        modifier

      angle = Math.min(150, angle)
      angle = Math.max(-150, angle)
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
    window.addEventListener("touchend", () => {
      window.removeEventListener("touchmove", throttledHandleDrag)
    })
  }

  useDebouncedEffect(
    () => {
      selectSweepSetting(id, level)
    },
    [level],
    100
  )

  return (
    <SweepControlContainer onMouseDown={startDrag} onTouchStart={startDrag}>
      <Knob level={level} size={100} noTransition />
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
    </SweepControlContainer>
  )
}
export default Slider
