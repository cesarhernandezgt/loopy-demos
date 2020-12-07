import React from "react"
import styled from "styled-components"

const StyledDate = styled.span`
  color: lightslategray;
`

const formatDate = dateString => {
  const date = new Date(dateString)

  return date.toDateString()
}

const DateTag = ({ date = "" }) => <StyledDate>{formatDate(date)}</StyledDate>

export default DateTag
