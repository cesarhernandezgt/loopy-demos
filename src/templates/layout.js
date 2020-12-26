import React from "react"
import styled from "styled-components"
import { config } from "@fortawesome/fontawesome-svg-core"
import { MDXProvider } from "@mdx-js/react"
import GlobalStyles from "../components/styles/global-styles"
import SEO from "./seo"
import Header from "./header"
import "@fortawesome/fontawesome-svg-core/styles.css"
import MarkdownLink from "../components/markdown-link"
import Footer from "./footer"

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

const Layout = ({
  children = null,
  location = {},
  title = "",
  pageContext = {},
  description = "",
}) => (
  <>
    <GlobalStyles />
    <SEO
      title={title || pageContext?.frontmatter?.title}
      description={description}
    />
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
    <Footer />
  </>
)

export default Layout
