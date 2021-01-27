import React from "react"
import Presets from "./presets"
import AudioPlayer from "./audio-player"
import PedalsWrapper from "./pedal-wrapper"

import { DemoContextProvider } from "../helpers/use-demo-state"

const DemoContainer = ({
  presets = [],
  pedals = [],
  slug = "",
  type = "single",
}) => (
  <DemoContextProvider presets={presets} pedals={pedals}>
    <AudioPlayer presets={presets} slug={slug} />
    <Presets presets={presets} />
    <PedalsWrapper type={type} pedals={pedals} />
  </DemoContextProvider>
)

export default DemoContainer
