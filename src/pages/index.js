import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import usePosts from "../helpers/use-posts"

const StyledPostsList = styled.ul`
  list-style: none;

  display: flex;
  flex-flow: row wrap;
  align-items: center;

  > li {
    width: 200px;
    height: 250px;
    margin: 0.5rem;
    position: relative;
  }
`

const StyledLink = styled(Link)`
  .title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    color: #ffff80;
    background: #9580ffd3;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    opacity: 0;
    transition: opacity ease-out 200ms;
  }

  &:hover {
    .title {
      opacity: 1;
    }
  }
`

const SecondPage = () => {
  const posts = usePosts()

  return (
    <Layout>
      <SEO title="Loopy Demos" />
      <h1>Latest Demos</h1>
      <StyledPostsList>
        {posts.map(({ title, slug, image }) => (
          <li>
            <StyledLink to={slug}>
              <Img
                fluid={image}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                imgStyle={{
                  objectFit: "contain",
                }}
              />
              <span className="title">{title}</span>
            </StyledLink>
          </li>
        ))}
      </StyledPostsList>
    </Layout>
  )
}

export default SecondPage
