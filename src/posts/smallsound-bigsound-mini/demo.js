import React from "react"
import styled from "styled-components"

import DemoController from "../../components/demo-controller"

const StyledPedalContainer = styled.div`
  padding: 0.5rem 1rem 2rem;
  width: 250px;
  box-sizing: border-box;
  margin: 0.5rem auto 1rem;
  border-radius: 10px;
  position: relative;

  background: #1660b4;
`

const StyledControlsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  grid-template-rows: repeat(3, 70px) 180px;

  > :nth-child(1) {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
  }
  > :nth-child(2) {
    grid-column: 3 / span 1;
    grid-row: 1 / span 1;
  }
  > :nth-child(3) {
    grid-column: 2 / span 1;
    grid-row: 2 / span 1;
  }
  > :nth-child(4) {
    grid-column: 1 / span 1;
    grid-row: 3 / span 1;
  }
  > :nth-child(5) {
    grid-column: 3 / span 1;
    grid-row: 3 / span 1;
  }
  > :nth-child(6) {
    grid-column: 2 / span 1;
    grid-row: 3 / span 1;
  }
  > :nth-child(7) {
    grid-column: 2 / span 1;
    grid-row: 4 / span 1;
  }

  > * {
    align-self: center;
    justify-self: center;
    z-index: 1;
  }

  > :last-child {
    align-self: flex-end;
  }
`

const pedalConfig = {
  knobs: [
    { id: "gain", label: "Gain" },
    { id: "volume", label: "Volume" },
    { id: "bias", label: "Bias", size: 48 },
    { id: "bass", label: "Bass", size: 48 },
    { id: "treble", label: "Treble", size: 48 },
  ],
  Enclosure: StyledPedalContainer,
  ControlsLayout: StyledControlsGrid,
}

const presets = [
  {
    id: "spitty_starved",
    label: "Spitty Starved",
    settings: { gain: 6, treble: 7, bass: 4, bias: 2, volume: 4 },
    audio: "/spitty_starved.mp3",
  },
  {
    id: "lo_fi",
    label: "Lo-fi",
    settings: { gain: 4, bass: 1, treble: 0, bias: 3, volume: 6 },
    audio: "/lo_fi.mp3",
  },
  {
    id: "high_gain",
    label: "High Gain",
    settings: { gain: 10, bass: 8, treble: 6, bias: 6, volume: 4 },
    audio: "/high_gain.mp3",
  },
  {
    id: "treble_boost",
    label: "Treble Boost",
    settings: { bass: 3, treble: 7, volume: 9, gain: 2 },
    audio: "/treble_boost.mp3",
  },
  {
    id: "low_gain_sparkle",
    label: "Low Gain Sparkle",
    settings: { gain: 4, treble: 7 },
    audio: "/low_gain_sparkle.mp3",
  },
  {
    id: "gain_sweep",
    label: "Gain Sweep",
    isSweep: true,
    target: "gain",
    values: [0, 3, 5, 7, 8, 10],
    initialValue: 0,
  },
  {
    id: "bias_sweep",
    label: "Bias Sweep",
    isSweep: true,
    target: "bias",
    values: [0, 2, 3, 5, 7, 9],
    initialValue: 3,
  },
]

const Demo = () => (
  <DemoController config={pedalConfig} presets={presets} clean="/clean.mp3" />
)

export default Demo
