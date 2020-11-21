import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import usePosts from "../helpers/use-posts"

const StyledPostsList = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: 250px;
  grid-row-gap: 0.5rem;
  grid-column-gap: 0.5rem;

  > article {
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;
    position: relative;
    background: #9580ff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const StyledLink = styled(Link)`
  display: inline-block;
  width: 100%;
  height: 100%;
  max-width: 200px;

  .title {
    position: absolute;
    top: 0;
    left: 0;
    font-weight: bold;
    font-size: 1.2rem;
    color: #ffff80;
    background: #9580ffaa;
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
