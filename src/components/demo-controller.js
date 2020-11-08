import React, { useState, useEffect } from "react"

import Pedal from "./pedal"
import Presets from "./presets"
import AudioPlayer from "./audio-player"

const DemoController = ({ config = {}, presets = [] }) => {
  const [activePreset, setActivePreset] = useState(presets[0] || {})
  const [sweepSetting, setSweepSetting] = useState({})
  const [isPedalOn, setIsPedalOn] = useState(false)

  useEffect(() => {
    if (activePreset.isSweep) {
      setSweepSetting({ [activePreset.target]: activePreset.initialValue })
    } else {
      setSweepSetting({})
    }
  }, [activePreset])

  return (
    <>
      <AudioPlayer
        presets={presets}
        activePreset={activePreset}
        sweepSetting={sweepSetting}
        isPedalOn={isPedalOn}
        slug={config.slug}
      />
      <Presets
        activePresetId={activePreset.id}
        presets={presets}
        onSelect={selectedId =>
          setActivePreset(presets.find(({ id }) => id === selectedId))
        }
      />
      <Pedal
        config={config}
        sweep={activePreset.isSweep && activePreset}
        settings={activePreset.settings || sweepSetting}
        onSelectSweep={setSweepSetting}
        isOn={isPedalOn}
        onToggleOn={setIsPedalOn}
      />
    </>
  )
}

export default DemoController
