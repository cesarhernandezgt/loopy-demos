import React from "react"
import { Link } from "gatsby"
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

  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  p {
    color: white;
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

const Posts = ({ location = {} }) => (
  <Layout location={location} title="Posts">
    <section>
      {usePosts().map(({ title, slug, excerpt, date }) => (
        <Post id={slug} key={slug}>
          <Link to={`/posts/${slug}`}>
            <h3>{title}</h3>
            <DateTag date={date} noMargin />
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
