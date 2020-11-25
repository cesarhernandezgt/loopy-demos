import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons"
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

const Breadcrumbs = styled.div`
  max-width: var(--pageWidth);
  margin: 0 auto;

  .label {
    margin-left: 1rem;
  }
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

const Layout = ({ children = null, pageContext = {}, location = {} }) => {
  const { model, builder, title } = pageContext.frontmatter || {}
  const pageTitle = builder && model && `${builder} - ${model}`

  const pageType = pageContext?.frontmatter?.type
  console.log({ pageType })

  const isSubPage = ["demo", "post"].includes(pageType)

  return (
    <>
      <GlobalStyles />
      <SEO title={title || pageTitle} />
      <Header pathname={location.pathname} />
      {isSubPage && (
        <Breadcrumbs>
          <Link to="/">
            <FontAwesomeIcon icon={faLongArrowAltLeft} />
            <span className="label">{`All ${pageType}s`}</span>
          </Link>
        </Breadcrumbs>
      )}
      <StyledMain>{children}</StyledMain>
      <StyledFooter>
        <div className="footerContent">
          <span>{`© ${new Date().getFullYear()}, Built with `}</span>
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </div>
      </StyledFooter>
    </>
  )
}

export default Layout
