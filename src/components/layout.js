import React from "react"
import styled from "styled-components"
import GlobalStyles from "./styles/global-styles"
import SEO from "./seo"
import Header from "./header"

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
  background: #282a36;
  padding: 1rem;
  margin-top: 3rem;

  .footerContent {
    max-width: var(--pageWidth);
  }
`

const Layout = ({ children = null, pageContext = {}, location = {} }) => {
  const { model, builder, title } = pageContext.frontmatter || {}
  const postTitle = builder && model && `${builder} - ${model}`

  return (
    <>
      <GlobalStyles />
      <SEO title={title || postTitle} />
      <Header pathname={location.pathname} />

      <StyledMain>{children}</StyledMain>
      <StyledFooter>
        <div className="footerContent">
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </div>
      </StyledFooter>
    </>
  )
}

export default Layout
