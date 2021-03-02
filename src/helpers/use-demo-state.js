import React, { createContext, useContext, useState, useEffect } from "react"

const findClosestValue = (value, valueArray) =>
  valueArray.reduce((acc, curr) => {
    const lastDistance = Math.abs(value - acc)
    const currDistance = Math.abs(value - curr)

    return lastDistance <= currDistance ? acc : curr
  }, valueArray[0])

const DemoContext = createContext(null)

const DemoContextProvider = ({
  children = null,
  presets = [],
  pedals = [],
  type = "single",
}) => {
  const [activePedal, setActivePedal] = useState(pedals[0]?.name)
  const [pedalsOn, setPedalsOn] = useState([])
  const [activePreset, setActivePreset] = useState(presets[0] || {})
  const [sweepSetting, setSweepSetting] = useState({})
  const [presetsLoaded, setPresetsLoaded] = useState([])
  const [hasLoadingStarted, setHasLoadingStarted] = useState(false)
  const [presetLoadingErrors, setPresetLoadingErrors] = useState([])

  const selectPreset = selectedId => {
    setActivePreset(presets.find(({ id }) => id === selectedId))
  }

  const selectSweepSetting = (selectedId, value) => {
    if (!activePreset.isSweep) return

    const closestVal = findClosestValue(value, activePreset.values)

    setSweepSetting({ [selectedId]: closestVal })
  }

  const addPresetsLoaded = id => {
    setPresetsLoaded(prevState => [...prevState, id])
  }

  const addPresetLoadingError = id => {
    setPresetLoadingErrors(prevState => [...prevState, id])
  }

  const getIsPedalOn = name => pedalsOn.includes(name)

  const setIsPedalOn = (name, isOn) => {
    if (isOn) {
      setPedalsOn(prev => [...prev, name])
    } else {
      setPedalsOn(prev => prev.filter(pedal => pedal !== name))
    }
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
        pedalsOn,
        activePreset,
        sweepSetting,
        presetsLoaded,
        hasLoadingStarted,
        presetLoadingErrors,
        activePedal,
        demoType: type,
        getIsPedalOn,
        setHasLoadingStarted,
        setIsPedalOn,
        selectPreset,
        selectSweepSetting,
        addPresetsLoaded,
        addPresetLoadingError,
        setActivePedal,
      }}
    >
      {children}
    </DemoContext.Provider>
  )
}

const useDemoState = () => useContext(DemoContext)

export { DemoContextProvider }
export default useDemoState
