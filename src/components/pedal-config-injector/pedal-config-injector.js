import React, { useState, cloneElement } from "react"
import PedalConfigurator from "./pedal-configurator"

const PedalConfigInjector = ({ config = {}, children = () => {} }) => {
  const [modifiedConfig, setModifiedConfig] = useState(config)
  return (
    <>
      {cloneElement(children, modifiedConfig)}
      <PedalConfigurator
        modifiedConfig={modifiedConfig}
        setModifiedConfig={setModifiedConfig}
      />
    </>
  )
}

export default PedalConfigInjector
