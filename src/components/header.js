import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Logo from "./svg/logo"

const StyledHeader = styled.header`
  background: #282a36;
  margin-bottom: 2rem;
  width: 100%;
`

const StyledHeaderContent = styled.div`
  margin: 0 auto;
  max-width: 720px;
  padding: 1rem 1rem;
  display: flex;
  align-items: center;
`

const StyledHeaderLinkWrapper = styled.div`
  margin-left: 2rem;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  /* Because svg has 96px height */
  height: 96px;
`

const StyledNav = styled.nav`
  ul {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
    align-items: center;

    li {
      margin-right: 3rem;

      a {
        color: #ff80bf;
        font-family: "Sigmar One", cursive;
        font-size: 1.5rem;
        position: relative;

        :after {
          content: " ";
          /* opacity: 0; */
          width: 0;
          transition: all 0.2s ease-in;
          position: absolute;
          bottom: 0;
          left: 50%;
          /* width: 100%; */
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

const Header = () => (
  <StyledHeader>
    <StyledHeaderContent>
      <Link to="/">
        <Logo />
      </Link>
      <StyledHeaderLinkWrapper>
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <h1
            style={{
              margin: "0",
              color: "#9580ff",
              textTransform: "uppercase",
            }}
          >
            Loopy Demos
          </h1>
        </Link>
        <StyledNav>
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
        </StyledNav>
      </StyledHeaderLinkWrapper>
    </StyledHeaderContent>
  </StyledHeader>
)

export default Header
