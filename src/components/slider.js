import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"
import useDemoState from "../helpers/use-demo-state"
import Knob from "./knob"

const SweepControlContainer = styled.div`
  display: flex;
  align-items: center;
`

const sliderThumb = css`
  height: 24px;
  width: 24px;
  border-radius: 50%;
  border: none;
  background: var(--cyan);
  cursor: pointer;
`

const sliderTrack = css`
  width: 100%;
  height: 8px;
  background: linear-gradient(
    to right,
    var(--pink) var(--progress),
    var(--dark) var(--progress)
  );
  border-radius: 3px;
  border: none;
  cursor: pointer;
`

const StyledSlider = styled.input`
  flex-grow: 1;
  -webkit-appearance: none;
  background: none;
  outline: 0;
  --progress: ${props => props.progress}%;

  ::-webkit-slider-thumb {
    margin-top: -8px;
    -webkit-appearance: none;
    ${sliderThumb}
  }

  ::-moz-range-thumb {
    ${sliderThumb}
  }

  ::-webkit-slider-runnable-track {
    ${sliderTrack}
  }

  ::-moz-range-track {
    ${sliderTrack}
  }
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
    let moveStart = downEvent.pageY
    let skip = false
    let hasSkipped = 0

    const handleMouseMove = moveEvent => {
      moveEvent.preventDefault()
      if (skip) {
        hasSkipped += 1
        console.log("skipping")
        if (hasSkipped > 4) {
          hasSkipped = 0
          skip = false
        }
        return
      }
      skip = true
      const moveY = moveStart - moveEvent.pageY
      moveStart = moveEvent.pageY
      setLevel(prevLevel => {
        let nextLevel = prevLevel + Math.sign(moveY)
        nextLevel = Math.min(10, nextLevel)
        nextLevel = Math.max(0, nextLevel)
        nextLevel = Math.round(nextLevel)

        return nextLevel
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleMouseMove, {
      passive: false,
    })
    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", handleMouseMove)
    })
    window.addEventListener("touchend", () => {
      window.removeEventListener("touchmove", handleMouseMove)
    })
  }

  return (
    <SweepControlContainer onMouseDown={startDrag} onTouchStart={startDrag}>
      <Knob level={level} size={100} />
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      {/* <StyledSlider
        type="range"
        id={id}
        min={0}
        max={10}
        step="0.5"
        value={currentValue}
        onChange={e => {
          clearTimeout(timeoutRef)
          const val = e.target.value
          setCurrentValue(val)
          const timeoutId = setTimeout(() => {
            selectSweepSetting(id, val)
          }, 100)
          setTimeoutRef(timeoutId)
        }}
        progress={(currentValue / 10) * 100}
      /> */}
    </SweepControlContainer>
  )
}
export default Slider
