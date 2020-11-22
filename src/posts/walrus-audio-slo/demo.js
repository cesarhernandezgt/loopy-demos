import React from "react"
import DemoController from "../../components/demo-controller"
import image from "./walrus-audio-slo.png"

const pedalConfig = {
  slug: "walrus_audio_slo",
  width: 250,
  height: 474,
  image,
  knobs: [
    { id: "decay", size: 60, position: { top: 36, left: 14 }, type: "walrus" },
    { id: "filter", size: 60, position: { top: 38, left: 92 }, type: "walrus" },
    { id: "mix", size: 60, position: { top: 36, left: 170 }, type: "walrus" },
    { id: "x", size: 60, position: { top: 140, left: 14 }, type: "walrus" },
    {
      id: "depth",
      size: 60,
      position: { top: 140, left: 170 },
      type: "walrus",
    },
  ],
  switches: [
    {
      id: "bypass",
      size: 96,
      position: { top: 370, left: 16 },
    },
    {
      id: "sustain",
      size: 96,
      position: { top: 370, left: 145 },
    },
  ],
  leds: [
    {
      id: "on_status",
      position: { top: 0, left: 0 },
    },
  ],
}

const presets = [
  {
    id: "dont_know_yet",
    label: "Don't know yet",
    settings: { decay: 6, filter: 7, mix: 4, x: 2, depth: 4 },
    // audio: "spitty_starved.mp3",
  },
  {
    id: "another_one",
    label: "Another One",
    settings: { decay: 4, filter: 3, mix: 7, x: 8, depth: 7 },
    // audio: "spitty_starved.mp3",
  },
]

const Demo = () => <DemoController config={pedalConfig} presets={presets} />

export default Demo
