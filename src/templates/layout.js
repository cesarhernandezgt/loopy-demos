import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { config } from "@fortawesome/fontawesome-svg-core"
import { MDXProvider } from "@mdx-js/react"
import GlobalStyles from "../components/styles/global-styles"
import SEO from "./seo"
import Header from "./header"
import "@fortawesome/fontawesome-svg-core/styles.css"
import MarkdownLink from "../components/markdown-link"

config.autoAddCss = false

const StyledMain = styled.main`
  /**
    100vh - header height - margin bottom header
    - footer margin top
   */
  --headerMargin: 1rem;
  @media (min-width: 600px) {
    --headerMargin: 2rem;
  }

  min-height: calc(100vh - var(--headerHeight) - var(--headerMargin) - 3rem);
  max-width: var(--pageWidth);
  margin: 0 auto;
  padding: 0 1rem;
`

const StyledFooter = styled.footer`
  background: var(--dark);
  padding: 1rem;
  margin-top: 3rem;

  * {
    font-size: 1rem;
  }

  .footerContent {
    display: flex;
    justify-content: flex-end;
    max-width: var(--pageWidth);
    margin: 0 auto;

    > * {
      flex: 0 0 auto;
    }
  }
`

const Layout = ({ children = null, location = {}, title = "" }) => {
  return (
    <>
      <GlobalStyles />
      <SEO title={title} />
      <Header pathname={location.pathname} />
      <StyledMain>
        <MDXProvider
          components={{
            a: MarkdownLink,
          }}
        >
          {children}
        </MDXProvider>
      </StyledMain>
      <StyledFooter>
        <div className="footerContent">
          <a
            href="https://github.com/silvb/loopy-demos"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} size="1x" />
          </a>
          <span>{`© ${new Date().getFullYear()}, Built with `}</span>
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </div>
      </StyledFooter>
    </>
  )
}

export default Layout
