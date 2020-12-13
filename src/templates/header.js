import React, { useState } from "react"
import { Link } from "gatsby"
import styled, { createGlobalStyle, css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import Logo from "../components/svg/logo"
import MenuIcon from "../components/svg/menu-icon"
import useScrollPosition from "../helpers/use-scroll-position"

const HeaderContainer = styled.header`
  background: var(--dark);
  width: 100%;
  z-index: 100;
  margin-bottom: 1rem;

  @media (min-width: 600px) {
    margin-bottom: 2rem;
  }

  @media (max-width: 599px) {
    position: sticky;
    /* top: 0; */
    top: ${props => (props.hideHeader ? 0 : -64)}px;
    transition: top 0.3s ease;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`

const HeaderContent = styled.div`
  margin: 0 auto;
  max-width: 720px;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;

  #menu-icon {
    display: flex;
    align-items: center;
  }

  #logo {
    display: none;
  }
  @media (min-width: 600px) {
    padding: 1rem 1rem;

    #logo {
      display: block;
    }

    #menu-icon {
      display: none;
    }
  }
`

const HeaderLinkWrapper = styled.div`
  flex: 1 1 auto;
  margin-left: 1rem;
  display: flex;
  flex-flow: column;
  justify-content: center;
  padding: 0.5rem 0;
  box-sizing: border-box;
  height: 48px;

  @media (min-width: 600px) {
    justify-content: space-between;
    margin-left: 2rem;
    height: 96px;
  }
`

const Title = styled(Link)`
  display: flex;
  align-items: center;

  h1 {
    margin: 0 0 0.5rem;
    color: var(--purple);
    text-shadow: 2px 3px var(--yellow);

    @media (max-width: 400px) {
      font-size: 1.5rem;
      text-shadow: 1px 2px var(--yellow);
    }
  }
`

const TopNav = styled.nav`
  display: none;

  @media (min-width: 600px) {
    display: block;
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;

    li {
      :not(:last-child) {
        margin-right: 1rem;
      }

      a {
        font-family: var(--headlineFont);
        font-size: 1.3rem;
        position: relative;
        color: var(--pink);
        transition: color 0.1s ease-in;

        @media (min-width: 720px) {
          font-size: 1.5rem;
        }

        &.highlight {
          color: var(--cyan);
        }
      }

      &:hover {
        a {
          color: var(--cyan);
        }
      }
    }
  }
`

const GlobalOverflow = createGlobalStyle`
  body {
    overflow: ${({ showSideNav }) => (showSideNav ? "hidden" : "auto")}
  }
`

const visibleSideNav = css`
  transition: left 0.1s ease-in 0s, background-color 0.1s ease-in 0.1s,
    height 0s linear 0s;
  height: 100vh;
  left: 0;
  background-color: #00000080;
`

const hiddenSideNav = css`
  transition: left 0.1s ease-out 0.1s, background-color 0.1s ease-out 0s,
    height 0s linear 0.2s;
  height: 0;
  left: -100vw;
  background-color: #0000;
`

const SideNav = styled.aside`
  @media (min-width: 600px) {
    display: none;
  }

  position: absolute;
  top: var(--headerHeight);
  width: 100vw;
  z-index: 100;

  ${({ show }) => (show ? visibleSideNav : hiddenSideNav)}

  ul {
    background: var(--dark);
    width: 200px;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    padding-left: 1rem;
    padding-top: 2rem;

    li {
      margin-bottom: 1rem;

      a {
        display: inline-block;
        width: 100%;
        color: var(--pink);
        font-family: var(--headlineFont);
        font-size: 1.5rem;

        &.highlight {
          color: var(--cyan);
        }
      }
    }
  }
`
const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SocialIcons = styled.div`
  display: flex;
  align-items: center;

  > a {
    :not(:last-child) {
      margin-right: 1rem;
    }

    font-size: 2rem;

    color: var(--cyan);
    transition: color 0.1s ease-in;

    :hover {
      color: var(--pink);
    }
  }
`

const renderNavList = (pathname = "") => (
  <ul>
    {[
      { to: "/demos", title: "Demos" },
      { to: "/posts", title: "Posts" },
      { to: "/uses", title: "Uses" },
      { to: "/about", title: "About" },
      { to: "/contact", title: "Contact" },
    ].map(({ to, title }) => (
      <li key={to}>
        <Link to={to} className={pathname.startsWith(to) ? "highlight" : ""}>
          {title}
        </Link>
      </li>
    ))}
  </ul>
)

const Header = ({ pathname = "" }) => {
  const [showSideNav, setShowSideNav] = useState(false)
  const [hideHeader, setHideHeader] = useState(false)

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y < prevPos.y
      if (isShow !== hideHeader) setHideHeader(isShow)
    },
    [hideHeader]
  )

  return (
    <>
      <GlobalOverflow showSideNav={showSideNav} />
      <HeaderContainer hideHeader={!hideHeader}>
        <HeaderContent>
          <Link to="/" id="logo">
            <Logo />
          </Link>
          <button
            type="button"
            id="menu-icon"
            onClick={() => {
              setShowSideNav(!showSideNav)
            }}
          >
            <MenuIcon open={showSideNav} />
          </button>
          <HeaderLinkWrapper>
            <TitleRow>
              <Title
                to="/"
                onClick={() => {
                  setShowSideNav(false)
                }}
              >
                <h1>Loopy Demos</h1>
              </Title>
              <SocialIcons>
                <a
                  href="https://www.instagram.com/loopydemos/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} size="1x" />
                </a>
              </SocialIcons>
            </TitleRow>
            <TopNav>{renderNavList(pathname)}</TopNav>
          </HeaderLinkWrapper>
        </HeaderContent>
        <SideNav
          show={showSideNav}
          onClick={() => {
            setShowSideNav(false)
          }}
        >
          {renderNavList(pathname)}
        </SideNav>
      </HeaderContainer>
    </>
  )
}

export default Header
