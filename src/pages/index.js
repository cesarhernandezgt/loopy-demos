import React from "react"

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
  {
    id: "treble_boost",
    label: "Treble Boost",
    settings: { bass: 3, treble: 7, volume: 9, gain: 2 },
  },
  {
    id: "low_gain_sparkle",
    label: "Low Gain Sparkle",
    settings: { gain: 3, bias: 6, treble: 6 },
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

const SecondPage = () => (
  <Layout>
    <SEO title="Pedal Config Prototype" />
    <h1>Pedal Config Prototype</h1>
    <p>
      Pastrami leberkas pork belly hamburger brisket short loin. Tail shank
      swine rump andouille, meatloaf fatback porchetta short loin bresaola
      tri-tip frankfurter buffalo pig spare ribs. Filet mignon bresaola strip
      steak short loin kielbasa, shankle boudin corned beef tail buffalo
      leberkas jerky. Beef ribs sirloin buffalo swine.
    </p>
    <Demo config={pedalConfig} presets={presets} />
    <p>
      Spicy jalapeno bacon ipsum dolor amet cow landjaeger beef, ball tip pork
      jerky ground round boudin. Buffalo frankfurter shankle brisket, cupim
      meatball picanha short ribs turkey boudin rump kielbasa strip steak
      chicken. Ball tip bresaola porchetta pancetta turducken ribeye. Brisket
      alcatra meatloaf biltong. Ground round hamburger tri-tip jerky. Landjaeger
      fatback ribeye pig, kevin t-bone turkey.
    </p>
  </Layout>
)

export default SecondPage
