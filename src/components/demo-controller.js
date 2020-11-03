import React, { useState } from "react"
import Pedal from "./pedal"
import Presets from "./presets"

const DemoController = ({ config = {}, presets = [] }) => {
  const [activePreset, setActivePreset] = useState(presets[0])

  return (
    <>
      <Presets
        activePresetId={activePreset.id}
        presets={presets}
        onSelect={selectedId =>
          setActivePreset(presets.find(({ id }) => id === selectedId))
        }
      />
      <Pedal config={config} settings={activePreset.settings} />
    </>
  )
}

export default DemoController
