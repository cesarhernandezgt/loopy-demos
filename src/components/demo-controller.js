import React, { useState, useEffect } from "react"
import Pedal from "./pedal"
import Presets from "./presets"

const DemoController = ({ config = {}, presets = [] }) => {
  const [activePreset, setActivePreset] = useState(presets[0])
  const [sweepSetting, setSweepSetting] = useState({})

  useEffect(() => {
    if (activePreset.isSweep) {
      setSweepSetting({ [activePreset.target]: activePreset.initialValue })
    } else {
      setSweepSetting({})
    }
  }, [activePreset])

  return (
    <>
      <div>
        {/* We'll map the audio files with the preset IDs and sweep values */}
        <h3>Audio Player</h3>
        <p>Current prest ID: {activePreset?.id}</p>
        {activePreset?.isSweep && (
          <p>Gain sweep value: {sweepSetting[activePreset.target]}</p>
        )}
      </div>
      <Presets
        activePresetId={activePreset?.id}
        presets={presets}
        onSelect={selectedId =>
          setActivePreset(presets.find(({ id }) => id === selectedId))
        }
      />
      <Pedal
        config={config}
        sweep={activePreset?.isSweep && activePreset}
        settings={activePreset?.settings || sweepSetting}
        onSelectSweep={setSweepSetting}
      />
    </>
  )
}

export default DemoController
