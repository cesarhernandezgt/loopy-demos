import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "./layout"
import Breadcrumb from "./breadcrumb"
import DateTag from "../components/date-tag"

const PostLayout = ({
  data: {
    mdx: {
      body,
      frontmatter: { title, date, featuredImage },
      excerpt,
    },
  } = {
    mdx: {
      body: "",
      frontmatter: { title: "", featuredImage: {}, date: "" },
      excerpt: "",
    },
  },
  location = {},
}) => {
  const featuredImgFluid = featuredImage?.childImageSharp?.fluid
  return (
    <Layout location={location} title={title} description={excerpt}>
      <Breadcrumb label="All posts" />
      <h1>{title}</h1>
      <DateTag date={date} />
      <Img
        fluid={featuredImgFluid}
        style={{
          margin: "1rem auto 0",
          display: "block",
          maxHeight: "400px",
        }}
        imgStyle={{ objectFit: "contain" }}
      />
      <MDXRenderer>{body}</MDXRenderer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      body
      excerpt
      frontmatter {
        title
        date
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default PostLayout
