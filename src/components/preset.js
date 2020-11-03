import React from "react"
import styled from "styled-components"

const StyledPresetTag = styled.button`
  background: #9580ff;
  color: #282a36;
  font-size: 1rem;
  font-weight: 900;
  /* text-transform: uppercase; */
  padding: 0.5rem;
  margin: 0.25rem;
  cursor: pointer;
  opacity: ${props => (props.active ? "1" : "0.6")};
`

const Preset = ({
  id = "",
  label = "",
  active = false,
  onSelect = () => {},
}) => (
  <StyledPresetTag
    active={active}
    type="button"
    onClick={() => {
      onSelect(id)
    }}
  >
    {label}
  </StyledPresetTag>
)

export default Preset
