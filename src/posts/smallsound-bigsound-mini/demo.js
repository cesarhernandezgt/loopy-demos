import React from "react"
import styled from "styled-components"
import DemoController from "../../components/demo-controller"
import image from "./smallsound-bigsound-mini.png"

const StyledPedalContainer = styled.div`
  padding: 0.5rem 1rem 2rem;
  width: 250px;
  height: 412px;
  box-sizing: border-box;
  margin: 0.5rem auto 1rem;
  border-radius: 10px;
  position: relative;

  background: url(${image}) no-repeat;
  background-size: contain;
`

const StyledControlsGrid = styled.div`
  width: 100%;
  position: relative;

  > * {
    z-index: 1;
    position: absolute;
  }

  #gain {
    top: -2px;
    left: 9px;
  }
  #volume {
    top: 0px;
    left: 136px;
  }
  #bias {
    top: 76px;
    left: 80px;
  }
  #bass {
    top: 140px;
    left: 20px;
  }
  #treble {
    top: 140px;
    left: 140px;
  }
  #stomp-switch {
    top: 312px;
    left: 72px;
    transform: rotate(18deg);

    > svg {
      width: 76px;
      height: 76px;
    }
  }
  #led {
    top: 152px;
    left: 86px;
  }
`

const pedalConfig = {
  slug: "smallsound_bigsound_mini",
  knobs: [
    { id: "gain", size: 80 },
    { id: "volume", size: 80 },
    { id: "bias", size: 64 },
    { id: "bass", size: 64 },
    { id: "treble", size: 64 },
  ],
  Enclosure: StyledPedalContainer,
  ControlsLayout: StyledControlsGrid,
}

const presets = [
  {
    id: "spitty_starved",
    label: "Spitty Starved",
    settings: { gain: 6, treble: 7, bass: 4, bias: 2, volume: 4 },
    audio: "spitty_starved.mp3",
  },
  {
    id: "lo_fi",
    label: "Lo-fi",
    settings: { gain: 4, bass: 1, treble: 0, bias: 3, volume: 6 },
    audio: "lo_fi.mp3",
  },
  {
    id: "high_gain",
    label: "High Gain",
    settings: { gain: 10, bass: 8, treble: 6, bias: 6, volume: 4 },
    audio: "high_gain.mp3",
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
    id: "treble_boost",
    label: "Treble Boost",
    settings: { bass: 3, treble: 7, volume: 9, gain: 2 },
    audio: "treble_boost.mp3",
  },
  {
    id: "low_gain_sparkle",
    label: "Low Gain Sparkle",
    settings: { gain: 4, treble: 7 },
    audio: "low_gain_sparkle.mp3",
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

const Demo = () => <DemoController config={pedalConfig} presets={presets} />

export default Demo
