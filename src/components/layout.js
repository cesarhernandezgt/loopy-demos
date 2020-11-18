import React from "react"

import GlobalStyles from "./styles/global-styles"

import SEO from "./seo"
import Header from "./header"

const Layout = ({ children = null, pageContext = {} }) => {
  return (
    <>
      <GlobalStyles />
      <SEO title={pageContext.frontmatter?.title || `Title`} />
      <Header />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 720,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
          }}
        >
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

export default Layout
