import React from "react"
import DemoController from "../../components/demo-controller"
import image from "./walrus-audio-slo.png"

const pedalConfig = {
  slug: "walrus_audio_slo",
  width: 184,
  height: 350,
  image,
  knobs: [
    { id: "decay", size: 46, position: { top: 28, left: 12 }, type: "walrus" },
    { id: "filter", size: 46, position: { top: 28, left: 72 }, type: "walrus" },
    { id: "mix", size: 46, position: { top: 28, left: 128 }, type: "walrus" },
    { id: "x", size: 46, position: { top: 105, left: 12 }, type: "walrus" },
    {
      id: "depth",
      size: 46,
      position: { top: 105, left: 128 },
      type: "walrus",
    },
  ],
  leds: [
    {
      id: "on_status",
      size: 44,
      socket: true,
      position: { top: 241, left: 20 },
      colors: {
        off: "#d2e1e9a1",
        on: "#d4f9ff",
        socket: "black",
      },
    },
  ],
  switches: [
    {
      id: "bypass",
      size: 60,
      position: { top: 278, left: 15 },
    },
    {
      id: "mode",
      size: 30,
      type: "toggle",
      position: { top: 110, left: 78 },
    },
  ],
}

const presets = [
  {
    id: "dont_know_yet",
    label: "Don't know yet",
    settings: { decay: 6, filter: 7, mix: 4, x: 2, depth: 4, mode: 1 },
    // audio: "spitty_starved.mp3",
  },
  {
    id: "another_one",
    label: "Another one",
    settings: { decay: 4, filter: 3, mix: 7, x: 8, depth: 7, mode: 2 },
    // audio: "spitty_starved.mp3",
  },
  {
    id: "one_more",
    label: "One more",
    settings: { decay: 4, filter: 3, mix: 7, x: 8, depth: 7, mode: 3 },
    // audio: "spitty_starved.mp3",
  },
]

const Demo = () => <DemoController config={pedalConfig} presets={presets} />

export default Demo
