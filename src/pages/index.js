import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import usePosts from "../helpers/use-posts"

const StyledPostsList = styled.section`
  list-style: none;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 0.5rem;
  grid-column-gap: 0.5rem;
  flex-flow: row wrap;
  align-items: center;

  > article {
    width: 250px;
    height: 250px;
    padding: 1rem;
    box-sizing: border-box;
    position: relative;
    background: #9580ff;
  }
`

const StyledLink = styled(Link)`
  .title {
    position: absolute;
    top: 0;
    left: 0;
    font-weight: bold;
    color: #ffff80;
    font-size: 1.2rem;
    background: #323138;
    width: 100%;
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;
    opacity: 0;
    transition: opacity ease-out 200ms;

    display: flex;
    align-items: center;
    justify-content: center;

    > span {
      text-align: center;
    }
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
          <article>
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
              <div className="title">
                <span>{title}</span>
              </div>
            </StyledLink>
          </article>
        ))}
      </StyledPostsList>
    </Layout>
  )
}

export default SecondPage
