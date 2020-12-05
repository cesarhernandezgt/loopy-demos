import React, { createContext, useContext, useState, useEffect } from "react"

const DemoContext = createContext(null)

const DemoContextProvider = ({ children = null, presets = [] }) => {
  const [isPedalOn, setIsPedalOn] = useState(false)
  const [activePreset, setActivePreset] = useState(presets[0] || {})
  const [sweepSetting, setSweepSetting] = useState({})

  const selectPreset = selectedId => {
    setActivePreset(presets.find(({ id }) => id === selectedId))
  }

  useEffect(() => {
    if (activePreset.isSweep) {
      setSweepSetting({
        [activePreset.target]: activePreset.initialValue,
      })
    } else {
      setSweepSetting({})
    }
  }, [activePreset])

  return (
    <DemoContext.Provider
      value={{
        isPedalOn,
        activePreset,
        sweepSetting,
        setIsPedalOn,
        selectPreset,
        setSweepSetting,
      }}
    >
      {children}
    </DemoContext.Provider>
  )
}

const useDemoState = () => useContext(DemoContext)

export { DemoContextProvider }
export default useDemoState
