import React from "react"
import DemoController from "../../components/demo-controller"
import image from "./smallsound-bigsound-mini.png"

const pedalConfig = {
  slug: "smallsound_bigsound_mini",
  width: 250,
  height: 412,
  image,
  knobs: [
    { id: "gain", size: 80, position: { top: 4, left: 22 } },
    { id: "volume", size: 80, position: { top: 8, left: 151 } },
    { id: "bias", size: 64, position: { top: 80, left: 95 } },
    { id: "bass", size: 64, position: { top: 151, left: 35 } },
    { id: "treble", size: 64, position: { top: 150, left: 153 } },
  ],
  switches: [
    {
      id: "on_switch",
      size: 76,
      position: { top: 321, left: 88 },
    },
  ],
  leds: [
    {
      id: "on_status",
      position: { top: 160, left: 102 },
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
