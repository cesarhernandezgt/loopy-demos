import React from "react"
import Presets from "./presets"
import AudioPlayer from "./audio-player"
import PedalsWrapper from "./pedals-wrapper"

import { DemoContextProvider } from "../helpers/use-demo-state"

const DemoContainer = ({
  presets = [],
  pedals = [],
  slug = "",
  type = "single",
}) => (
  <DemoContextProvider presets={presets} pedals={pedals} type={type}>
    <AudioPlayer presets={presets} slug={slug} pedals={pedals} />
    <Presets presets={presets} />
    <PedalsWrapper type={type} pedals={pedals} />
  </DemoContextProvider>
)

export default DemoContainer
