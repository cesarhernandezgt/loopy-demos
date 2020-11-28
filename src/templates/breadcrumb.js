import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons"

const StyledLabel = styled.span`
  margin-left: 1rem;
`

const Breadcrumb = ({ label = "" }) => (
  <>
    <Link to="../">
      <FontAwesomeIcon icon={faLongArrowAltLeft} />
      <StyledLabel>{label}</StyledLabel>
    </Link>
  </>
)

export default Breadcrumb
