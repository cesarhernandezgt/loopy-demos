import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons"
import Layout from "../templates/layout"
import usePosts from "../helpers/use-posts"
import DateTag from "../components/date-tag"

const Post = styled.article`
  :not(:first-child) {
    margin-top: 3rem;
  }

  .imageExcerptFlex {
    display: flex;
  }

  .flexLink {
    display: flex;
    align-items: center;

    .featuredImage {
      margin-right: 1rem;

      &.imageDesktop {
        flex: 0 0 200px;
        display: none;
      }

      &.imageMobile {
        display: block;
        flex: 0 0 150px;
        margin-top: 1.2rem;
      }
    }

    @media (min-width: 600px) {
      .featuredImage {
        &.imageDesktop {
          display: block;
        }

        &.imageMobile {
          display: none;
        }
      }
    }
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  p {
    color: white;
  }

  .bottomRow {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    span {
      color: var(--cyan);
      margin-right: 1rem;
    }
  }
`

const Posts = ({ location = {} }) => (
  <Layout location={location} title="Posts">
    <section>
      {usePosts().map(({ title, slug, excerpt, date, image }) => (
        <Post id={slug} key={slug}>
          <Link to={`/posts/${slug}`} className="flexLink">
            <Img
              className="featuredImage imageDesktop"
              fluid={image}
              imgStyle={{
                objectFit: "contain",
              }}
            />
            <div>
              <h3>{title}</h3>
              <DateTag date={date} noMargin />
              <div className="imageExcerptFlex">
                <Img
                  className="featuredImage imageMobile"
                  fluid={image}
                  imgStyle={{
                    objectFit: "contain",
                    objectPosition: "center top",
                  }}
                />
                <p>{excerpt}</p>
              </div>
              <div className="bottomRow">
                <div>
                  <span>Read this post</span>
                  <FontAwesomeIcon icon={faLongArrowAltRight} />
                </div>
              </div>
            </div>
          </Link>
        </Post>
      ))}
    </section>
  </Layout>
)

export default Posts
