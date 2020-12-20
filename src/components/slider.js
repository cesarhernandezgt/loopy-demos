import React, { useState, useEffect } from "react"
import styled from "styled-components"
import useDemoState from "../helpers/use-demo-state"
import Knob from "./knob"

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

  const [timeoutRef, setTimeoutRef] = useState(null)

  useEffect(() => {
    clearTimeout(timeoutRef)
    const timeoutId = setTimeout(() => {
      selectSweepSetting(id, level)
    }, 100)
    setTimeoutRef(timeoutId)
  }, [level])

  const startDrag = downEvent => {
    if (!isBrowser) return
    downEvent.preventDefault()

    let moveStart = downEvent.pageY || downEvent.touches[0].pageY
    let skip = false
    let hasSkipped = 0

    const handleDrag = moveEvent => {
      moveEvent.preventDefault()
      if (skip) {
        hasSkipped += 1
        if (hasSkipped > 4) {
          hasSkipped = 0
          skip = false
        }
        return
      }
      skip = true
      const moveTo = moveEvent.pageY || moveEvent.touches[0].pageY
      const moveY = moveStart - moveTo
      moveStart = moveTo
      setLevel(prevLevel => {
        let nextLevel = prevLevel + moveY / 10
        nextLevel = Math.min(10, nextLevel)
        nextLevel = Math.max(0, nextLevel)

        return nextLevel
      })
    }
    window.addEventListener("mousemove", handleDrag)
    window.addEventListener("touchmove", handleDrag, {
      passive: false,
    })
    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", handleDrag)
    })
    window.addEventListener("touchend", () => {
      window.removeEventListener("touchmove", handleDrag)
    })
  }

  return (
    <SweepControlContainer onMouseDown={startDrag} onTouchStart={startDrag}>
      <Knob level={level} size={100} />
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
    </SweepControlContainer>
  )
}
export default Slider
