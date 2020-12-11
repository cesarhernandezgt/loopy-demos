import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "./layout"
import Demo from "../components/demo-container"
import Breadcrumb from "./breadcrumb"

const DemoLayout = ({
  data: {
    mdx: {
      body,
      frontmatter: { image, builder, model, config },
    },
  } = {
    mdx: {
      body: "",
      frontmatter: {
        image: {},
        builder: "",
        model: "",
        config: {},
      },
    },
  },
  location = {},
}) => {
  const configData =
    config?.internal?.content && JSON.parse(config.internal.content)
  const title = `${builder} - ${model}`

  return (
    <Layout location={location} title={title}>
      <Breadcrumb label="All demos" />
      <h1>{title}</h1>
      <Demo image={image?.childImageSharp?.fluid} {...configData} />
      <MDXRenderer>{body}</MDXRenderer>
    </Layout>
  )
}

export default DemoLayout

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        builder
        model
        image {
          childImageSharp {
            fluid(maxHeight: 350) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        config {
          internal {
            content
          }
        }
      }
    }
  }
`
