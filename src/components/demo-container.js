import React from "react"

import Pedal from "./pedal"
import Presets from "./presets"
import AudioPlayer from "./audio-player"

import { DemoContextProvider } from "../helpers/use-demo-state"

const DemoContainer = ({ presets = [], pedals = [], slug = "" }) => (
  <DemoContextProvider presets={presets}>
    <AudioPlayer presets={presets} slug={slug} />
    <Presets presets={presets} />
    {pedals.map(({ name, controls, image, alignment }) => (
      <Pedal
        key={name}
        name={name}
        {...controls}
        image={image}
        alignment={alignment}
      />
    ))}
  </DemoContextProvider>
)

export default DemoContainer
