import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "./layout"
import Breadcrumb from "./breadcrumb"
import DateTag from "../components/date-tag"

const PostLayout = ({
  data: {
    mdx: {
      body,
      frontmatter: { title, date },
    },
  } = {
    mdx: {
      body: "",
      frontmatter: { title: "" },
    },
  },
  location = {},
}) => {
  return (
    <Layout location={location} title={title}>
      <Breadcrumb label="All posts" />
      <h1>{title}</h1>
      <DateTag date={date} />
      <MDXRenderer>{body}</MDXRenderer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        date
      }
    }
  }
`

export default PostLayout
