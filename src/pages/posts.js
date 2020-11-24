import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import Layout from "../components/layout"
import usePosts from "../helpers/use-posts"

const Post = styled.article`
  h3 {
    margin-top: 0;
  }
`

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  a span {
    margin-right: 1rem;
  }
`

const formatDate = dateString => {
  const date = new Date(dateString)

  return date.toDateString()
}

const Posts = ({ location = {} }) => (
  <Layout location={location}>
    {usePosts().map(({ title, slug, excerpt, date }) => (
      <Post>
        <Link to={`/posts/${slug}`}>
          <h3>{title}</h3>
        </Link>
        <span>{formatDate(date)}</span>
        <p>{excerpt}</p>
        <BottomRow>
          <Link to={`/posts/${slug}`}>
            <span>Read this post</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </BottomRow>
      </Post>
    ))}
  </Layout>
)

export default Posts
