import React from "react"
import DemoController from "../../../components/demo-controller"
import image from "./smallsound-bigsound-mini.png"

const pedalConfig = {
  slug: "smallsound_bigsound_mini",
  width: 212,
  height: 350,
  image,
  knobs: [
    { id: "gain", size: 72, position: { top: 4, left: 22 } },
    { id: "volume", size: 72, position: { top: 4, left: 124 } },
    { id: "bias", size: 56, position: { top: 67, left: 80 } },
    { id: "bass", size: 56, position: { top: 125, left: 30 } },
    { id: "treble", size: 56, position: { top: 127, left: 131 } },
  ],
  leds: [
    {
      id: "on_status",
      size: 36,
      position: { top: 138, left: 89 },
    },
  ],
  switches: [
    {
      id: "on_switch",
      size: 72,
      position: { top: 268, left: 71 },
    },
  ],
}

const presets = [
  {
    id: "spitty_starved",
    label: "Spitty Starved",
    settings: { gain: 6, treble: 7, bass: 4, bias: 2, volume: 4 },
    audio: "spitty_starved.mp3",
  },
  {
    id: "low_gain_sparkle",
    label: "Low Gain Sparkle",
    settings: { gain: 4, treble: 7 },
    audio: "low_gain_sparkle.mp3",
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
    id: "lo_fi",
    label: "Lo-fi",
    settings: { gain: 4, bass: 1, treble: 0, bias: 3, volume: 6 },
    audio: "lo_fi.mp3",
  },
  {
    id: "bias_sweep",
    label: "Bias Sweep",
    isSweep: true,
    target: "bias",
    values: [0, 2, 3, 5, 7, 9],
    initialValue: 3,
  },
  {
    id: "treble_boost",
    label: "Treble Boost",
    settings: { bass: 3, treble: 7, volume: 9, gain: 2 },
    audio: "treble_boost.mp3",
  },
]

const Demo = () => <DemoController config={pedalConfig} presets={presets} />

export default Demo
