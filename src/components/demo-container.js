import React from "react"

import Pedal from "./pedal"
import Presets from "./presets"
import AudioPlayer from "./audio-player"
import AudioState from "./audio-state"

import { DemoContextProvider } from "../helpers/use-demo-state"

const DemoContainer = ({
  config: { presets, pedal } = { presets: [], pedal: {} },
  image = {},
}) => (
  <DemoContextProvider presets={presets}>
    <AudioState />
    {!pedal.offline && <AudioPlayer presets={presets} slug={pedal.slug} />}
    <Presets presets={presets} />
    <Pedal config={pedal.controls} image={image} />
  </DemoContextProvider>
)

export default DemoContainer
