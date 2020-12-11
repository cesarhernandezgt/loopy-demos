import React from "react"

import Pedal from "./pedal"
import Presets from "./presets"
import AudioPlayer from "./audio-player"

import { DemoContextProvider } from "../helpers/use-demo-state"

const DemoContainer = ({ presets = [], pedal = {}, image = {} }) => (
  <DemoContextProvider presets={presets}>
    {!pedal.offline && <AudioPlayer presets={presets} slug={pedal.slug} />}
    <Presets presets={presets} />
    <Pedal {...pedal.controls} image={image} />
  </DemoContextProvider>
)

export default DemoContainer
