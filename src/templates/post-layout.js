import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "./layout"
import Breadcrumb from "./breadcrumb"

const PostLayout = ({
  data: {
    mdx: {
      body,
      frontmatter: { title },
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
      }
    }
  }
`

export default PostLayout
