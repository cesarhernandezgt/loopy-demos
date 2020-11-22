import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Logo from "./svg/logo"
import MenuIcon from "./svg/menu-icon"

const StyledHeader = styled.header`
  background: #282a36;
  margin-bottom: 2rem;
  width: 100%;
`

const StyledHeaderContent = styled.div`
  margin: 0 auto;
  max-width: 720px;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;

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

const StyledHeaderLinkWrapper = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-flow: column;
  justify-content: center;
  padding: 0.5rem 0;
  box-sizing: border-box;
  /* Because menu icon has 64px height */
  height: 64px;

  @media (min-width: 600px) {
    justify-content: space-between;
    margin-left: 2rem;
    /* Because logo has 96px height */
    height: 96px;
  }
`

const StyledTitle = styled(Link)`
  display: flex;
  align-items: center;

  h1 {
    margin: 0;
    color: #9580ff;
    text-transform: uppercase;
  }
`

const StyledTopNav = styled.nav`
  display: none;

  @media (min-width: 600px) {
    display: block;
  }

  ul {
    display: flex;
    align-items: center;

    li {
      margin-right: 3rem;

      a {
        color: #ff80bf;
        font-family: var(--headlineFont);
        font-size: 1.5rem;
        position: relative;

        :after {
          content: " ";
          width: 0;
          transition: all 0.2s ease-in;
          position: absolute;
          bottom: 0;
          left: 50%;
          height: 6px;
          background: #ff80bf;
          border-radius: 2px;
        }
      }

      &:hover {
        a:after {
          left: 0;
          width: 100%;
        }
      }
    }
  }
`

const StyledSideNav = styled.aside`
  @media (min-width: 600px) {
    display: none;
  }

  position: absolute;
  top: 80px;
  left: ${({ show }) => (show ? 0 : -100)}vw;
  height: calc(100vh - 80px);
  width: 100vw;
  z-index: 100;
  transition: left 0.2s ${({ show }) => (show ? "ease-in 0" : "ease-out 0.1")}s,
    background 0.1s ${({ show }) => (show ? "ease-in 0.2" : "ease-out 0")}s;
  background: ${({ show }) => (show ? "#00000080" : "#0000")};

  ul {
    background: #282a36;
    width: 200px;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    padding-left: 1rem;
    padding-top: 1rem;

    li {
      a {
        color: #ff80bf;
        font-family: var(--headlineFont);
        font-size: 1.5rem;
      }
    }
  }
`

const NavList = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
    <li>
      <Link to="/contact">Contact</Link>
    </li>
  </ul>
)

const Header = () => {
  const [showSideNav, setShowSideNav] = useState(false)

  return (
    <>
      <StyledHeader>
        <StyledHeaderContent>
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
            <MenuIcon rotate={showSideNav} />
          </button>
          <StyledHeaderLinkWrapper>
            <StyledTitle
              to="/"
              onClick={() => {
                setShowSideNav(false)
              }}
            >
              <h1>Loopy Demos</h1>
            </StyledTitle>
            <StyledTopNav>
              <NavList />
            </StyledTopNav>
          </StyledHeaderLinkWrapper>
        </StyledHeaderContent>
      </StyledHeader>
      <StyledSideNav
        show={showSideNav}
        onClick={() => {
          setShowSideNav(false)
        }}
      >
        <NavList />
      </StyledSideNav>
    </>
  )
}

export default Header
