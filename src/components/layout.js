/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"

import GlobalStyles from "./styles/global-styles"

import SEO from "./seo"
// import Header from "./header"

const Layout = ({ children = null, pageContext = {} }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     allMdx {
  //       edges {
  //         node {
  //           frontmatter {
  //             title
  //           }
  //         }
  //       }
  //     }
  //   }
  // `)

  console.log({ pageContext })

  return (
    <>
      <GlobalStyles />
      {/* <Header siteTitle={data.site.siteMetadata?.title || `Title`} /> */}
      <SEO title={pageContext.frontmatter?.title || `Title`} />
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
