import React from "react"
import styled from "styled-components"
import COLORS from "../styles/colors"

const FloatingConfigContainer = styled.aside`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: ${COLORS.dark};
  padding: 1rem 1rem;
  border: 4px solid ${COLORS.green};
  border-radius: 8px;
  max-width: 360px;

  * {
    font-family: "JetBrains Mono", monospace;
  }

  h2 {
    text-transform: uppercase;
    font-size: 1.2rem;
  }

  h3 {
    color: ${COLORS.purple};
  }
`

const InputsContainer = styled.div`
  height: 400px;
  overflow-y: scroll;
  border: 2px solid ${COLORS.darkPurple};
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
`

const InputWrapper = styled.label`
  display: flex;
  align-items: center;
  flex: 1 0 auto;
  flex-flow: row nowrap;
  margin-bottom: 0.5rem;

  :not(:last-child) {
    margin-right: 1rem;
  }

  span {
    font-size: 0.8rem;
    color: ${COLORS.cyan};
    margin-right: 0.5rem;
  }

  input + svg {
    display: none;
  }

  input[type="checkbox"]:checked + svg {
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    top: 0.2rem;
    left: 0.15rem;
    color: ${COLORS.green};
  }

  input {
    background: ${COLORS.darkPurple};
    color: ${COLORS.purple};
    font-size: 1rem;
    padding: 2px;
    text-align: center;
    vertical-align: middle;
    outline: none;
    border: none;
    max-width: 100px;
    border-radius: 4px;

    &[type="number"] {
      width: 2rem;
      height: 2rem;
      -moz-appearance: textfield;
      &:-webkit-inner-spin-button,
      &:-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    &[type="checkbox"] {
      cursor: pointer;
      background: ${COLORS.darkPurple};
      appearance: none;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 3px;
      margin: 0;
    }
  }
`

const InputRow = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row wrap;
`

const StyledCodeWrapper = styled.div`
  max-height: 200px;
  background: ${COLORS.darkPurple};
  overflow-y: scroll;
`

const ConfigInput = ({ label = "", ...rest }) => (
  <InputWrapper>
    <span>{label}:</span>
    <div style={{ position: "relative" }}>
      <input {...rest} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        focusable="false"
      >
        <path
          fill="none"
          stroke={COLORS.green}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.73 12.91l6.37 6.37L22.79 4.59"
        />
      </svg>
    </div>
  </InputWrapper>
)

const renderJson = config => {
  const jsonString = JSON.stringify({ controls: config })
  return jsonString.slice(1, jsonString.length - 1)
}

const PedalConfigurator = ({
  modifiedConfig = {},
  setModifiedConfig = () => {},
}) => {
  const handleChange = (id, group, value) => {
    setModifiedConfig(prevConfig => {
      const modifiedGroup = prevConfig[group]?.map(element =>
        element.id === id ? { ...element, ...value } : element
      )

      return { ...prevConfig, [group]: modifiedGroup }
    })
  }

  return (
    <FloatingConfigContainer>
      <InputsContainer>
        <h2>Knobs</h2>
        {modifiedConfig?.knobs?.map(({ size, position, type, id }) => (
          <div key={id}>
            <h3>{id}</h3>
            <InputRow>
              <ConfigInput
                label="left"
                value={position?.left}
                type="number"
                onChange={e =>
                  handleChange(id, "knobs", {
                    position: {
                      left: Number(e.target.value),
                      top: Number(position?.top),
                    },
                  })
                }
              />
              <ConfigInput
                label="top"
                value={position?.top}
                type="number"
                onChange={e =>
                  handleChange(id, "knobs", {
                    position: {
                      left: Number(position?.left),
                      top: Number(e.target.value),
                    },
                  })
                }
              />
              <ConfigInput
                label="size"
                value={size}
                type="number"
                onChange={e =>
                  handleChange(id, "knobs", { size: Number(e.target.value) })
                }
              />
              <ConfigInput
                label="type"
                value={type}
                type="text"
                onChange={e =>
                  handleChange(id, "knobs", { type: e.target.value })
                }
              />
            </InputRow>
          </div>
        ))}
        <h2>Switches</h2>
        {modifiedConfig?.switches?.map(
          ({ size, position, orientation, id, type }) => (
            <div key={id}>
              <h3>{id}</h3>
              <InputRow>
                <ConfigInput
                  label="left"
                  value={position?.left}
                  type="number"
                  onChange={e =>
                    handleChange(id, "switches", {
                      position: {
                        left: Number(e.target.value),
                        top: Number(position?.top),
                      },
                    })
                  }
                />
                <ConfigInput
                  label="top"
                  value={position?.top}
                  type="number"
                  onChange={e =>
                    handleChange(id, "switches", {
                      position: {
                        left: Number(position?.left),
                        top: Number(e.target.value),
                      },
                    })
                  }
                />
                <ConfigInput
                  label="size"
                  value={size}
                  type="number"
                  onChange={e =>
                    handleChange(id, "switches", {
                      size: Number(e.target.value),
                    })
                  }
                />
                <ConfigInput
                  label="type"
                  value={type}
                  type="text"
                  onChange={e =>
                    handleChange(id, "switches", { type: e.target.value })
                  }
                />
                <ConfigInput
                  label="orientation"
                  value={orientation}
                  type="text"
                  onChange={e =>
                    handleChange(id, "switches", {
                      orientation: e.target.value,
                    })
                  }
                />
              </InputRow>
            </div>
          )
        )}
        <h2>LEDs</h2>
        {modifiedConfig?.leds?.map(({ id, position, size, socket, colors }) => (
          <div key={id}>
            <h3>{id}</h3>
            <InputRow>
              <ConfigInput
                label="left"
                value={position?.left}
                type="number"
                onChange={e =>
                  handleChange(id, "leds", {
                    position: {
                      left: Number(e.target.value),
                      top: Number(position?.top),
                    },
                  })
                }
              />
              <ConfigInput
                label="top"
                value={position?.top}
                type="number"
                onChange={e =>
                  handleChange(id, "leds", {
                    position: {
                      left: Number(position?.left),
                      top: Number(e.target.value),
                    },
                  })
                }
              />
              <ConfigInput
                label="size"
                value={size}
                type="number"
                onChange={e =>
                  handleChange(id, "leds", { size: Number(e.target.value) })
                }
              />
              <ConfigInput
                label="has socket"
                checked={socket}
                type="checkbox"
                onChange={e => {
                  handleChange(id, "leds", { socket: e.target.checked })
                }}
              />
              <ConfigInput
                label="color off"
                value={colors?.off}
                type="text"
                onChange={e =>
                  handleChange(id, "leds", {
                    colors: { ...colors, off: e.target.value },
                  })
                }
              />
              <ConfigInput
                label="color on"
                value={colors?.on}
                type="text"
                onChange={e =>
                  handleChange(id, "leds", {
                    colors: { ...colors, on: e.target.value },
                  })
                }
              />
              <ConfigInput
                label="color socket"
                value={colors?.socket}
                type="text"
                onChange={e =>
                  handleChange(id, "leds", {
                    colors: { ...colors, socket: e.target.value },
                  })
                }
              />
            </InputRow>
          </div>
        ))}
        <h2>Labels</h2>
        {modifiedConfig?.labels?.map(({ id, position, labelPosition }) => (
          <div key={id}>
            <h3>{id}</h3>
            <InputRow>
              <ConfigInput
                label="left"
                value={position?.left}
                type="number"
                onChange={e =>
                  handleChange(id, "labels", {
                    position: {
                      left: Number(e.target.value),
                      top: Number(position?.top),
                    },
                  })
                }
              />
              <ConfigInput
                label="top"
                value={position?.top}
                type="number"
                onChange={e =>
                  handleChange(id, "labels", {
                    position: {
                      left: Number(position?.left),
                      top: Number(e.target.value),
                    },
                  })
                }
              />
              <ConfigInput
                label="label left"
                value={labelPosition?.left}
                type="number"
                onChange={e =>
                  handleChange(id, "labels", {
                    labelPosition: {
                      left: Number(e.target.value),
                      top: Number(labelPosition?.top),
                    },
                  })
                }
              />
              <ConfigInput
                label="label top"
                value={labelPosition?.top}
                type="number"
                onChange={e =>
                  handleChange(id, "labels", {
                    labelPosition: {
                      left: Number(labelPosition?.left),
                      top: Number(e.target.value),
                    },
                  })
                }
              />
            </InputRow>
          </div>
        ))}
      </InputsContainer>
      <StyledCodeWrapper>
        <code>{renderJson(modifiedConfig)}</code>
      </StyledCodeWrapper>
    </FloatingConfigContainer>
  )
}

export default PedalConfigurator
