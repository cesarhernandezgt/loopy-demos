import React from "react"
import styled from "styled-components"

const StyledDate = styled.span`
  color: lightslategray;
  margin-top: ${props => (props.noMargin ? 0 : -0.5)}rem;
  display: block;
`

const formatDate = dateString => {
  const date = new Date(dateString)

  return date.toDateString()
}

const DateTag = ({ date = "", noMargin = false }) => (
  <StyledDate noMargin={noMargin}>{formatDate(date)}</StyledDate>
)

export default DateTag
