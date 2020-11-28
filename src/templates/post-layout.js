import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import Layout from "./layout"
import MarkdownLink from "../components/markdown-link"

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
}) => {
  return (
    <Layout>
      <MDXProvider
        components={{
          a: MarkdownLink,
        }}
      >
        <h1>{title}</h1>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
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
