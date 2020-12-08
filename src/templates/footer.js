import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

const StyledFooter = styled.footer`
  background: var(--dark);
  padding: 1rem;
  margin-top: 3rem;

  * {
    font-size: 1rem;
  }

  .footerRow {
    display: flex;
    justify-content: center;
    max-width: var(--pageWidth);
    margin: 0 auto;

    > * {
      flex: 0 0 auto;
      &:not(:last-child) {
        margin-right: 1.5rem;
      }
    }
  }
`

const Footer = () => (
  <StyledFooter>
    <div className="footerRow">
      <Link to="/imprint">Imprint and Privacy Policy</Link>
      <span>© Loopy Demos ∞</span>
    </div>
    <div className="footerRow">
      <a
        href="https://github.com/silvb/loopy-demos"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faGithub} size="1x" />
      </a>
      <div>
        <span>{`Built with `}</span>
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </div>
    </div>
  </StyledFooter>
)

export default Footer
