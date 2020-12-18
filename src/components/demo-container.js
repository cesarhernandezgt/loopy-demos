import React from "react"

import Pedal from "./pedal"
import Presets from "./presets"
import AudioPlayer from "./audio-player"
import ExternalControls from "./external-controls"

import { DemoContextProvider } from "../helpers/use-demo-state"

const DemoContainer = ({
  presets = [],
  pedal = {},
  image = {},
  externalControls = [],
}) => (
  <DemoContextProvider presets={presets}>
    {!pedal.offline && <AudioPlayer presets={presets} slug={pedal.slug} />}
    <Presets presets={presets} />
    <ExternalControls controls={externalControls} />
    <Pedal {...pedal.controls} image={image} />
  </DemoContextProvider>
)

export default DemoContainer
