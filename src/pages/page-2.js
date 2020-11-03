import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Demo from "../components/demo-controller"

const pedalConfig = {
  knobs: [
    { id: "gain", label: "Gain" },
    { id: "volume", label: "Volume" },
    { id: "bias", label: "Bias", size: 48 },
    { id: "bass", label: "Bass", size: 48 },
    { id: "treble", label: "Treble", size: 48 },
  ],
}

const presets = [
  {
    id: "high_gain",
    label: "High Gain",
    settings: { gain: 9, bass: 6, treble: 7, bias: 7 },
  },
  {
    id: "spitty_starved",
    label: "Spitty Starved",
    settings: { gain: 8, treble: 8, bias: 3 },
  },
  {
    id: "lo_fi",
    label: "Lo-fi",
    settings: { gain: 6, bass: 3, treble: 4, bias: 2 },
  },
  { id: "treble_boost", label: "Treble Boost" },
  { id: "low_gain_sparkle", label: "Low Gain Sparkle" },
  {
    id: "gain_sweep",
    label: "Gain Sweep",
    isSweep: true,
    target: "gain",
    values: [0, 3, 5, 7, 8, 10],
    initialValue: 0,
  },
]

const SecondPage = () => (
  <Layout>
    <SEO title="Pedal Config Prototype" />
    <h1>Pedal Config Prototype</h1>
    <p>This is me trying to configure a pedal demo</p>
    <Demo config={pedalConfig} presets={presets} />
  </Layout>
)

export default SecondPage
