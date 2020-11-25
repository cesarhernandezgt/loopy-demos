import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons"
import Layout from "../components/layout"
import usePosts from "../helpers/use-posts"

const Post = styled.article`
  :not(:first-child) {
    margin-top: 3rem;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  span,
  p {
    color: white;
  }

  span.date {
    color: lightslategray;
  }
`

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  span {
    color: var(--cyan);
    margin-right: 1rem;
  }
`

const formatDate = dateString => {
  const date = new Date(dateString)

  return date.toDateString()
}

const Posts = ({ location = {} }) => (
  <Layout location={location}>
    <section>
      {usePosts().map(({ title, slug, excerpt, date }) => (
        <Post id={slug}>
          <Link to={`/posts/${slug}`}>
            <h3>{title}</h3>
            <span className="date">{formatDate(date)}</span>
            <p>{excerpt}</p>
            <BottomRow>
              <div>
                <span>Read this post</span>
                <FontAwesomeIcon icon={faLongArrowAltRight} />
              </div>
            </BottomRow>
          </Link>
        </Post>
      ))}
    </section>
  </Layout>
)

export default Posts
