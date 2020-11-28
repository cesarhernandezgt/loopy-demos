import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "./layout"
import Demo from "../components/demo-controller"

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
}) => {
  const configData =
    config?.internal?.content && JSON.parse(config.internal.content)

  return (
    <Layout>
      <h1>{`${builder} - ${model}`}</h1>
      <Demo image={image?.childImageSharp?.fluid} config={configData} />
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
