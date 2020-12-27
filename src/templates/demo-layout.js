import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "./layout"
import Demo from "../components/demo-container"
import Breadcrumb from "./breadcrumb"
import DateTag from "../components/date-tag"

const DemoLayout = ({
  data: {
    mdx: {
      body,
      excerpt,
      frontmatter: { image, builder, model, config, date },
    },
  } = {
    mdx: {
      body: "",
      excerpt: "",
      frontmatter: {
        image: {},
        builder: "",
        model: "",
        config: {},
        date: "",
      },
    },
  },
  location = {},
}) => {
  const configData =
    config?.internal?.content && JSON.parse(config.internal.content)
  const title = `${builder} - ${model}`

  return (
    <Layout location={location} title={title} description={excerpt}>
      <Breadcrumb label="All demos" />
      <h1>{title}</h1>
      <DateTag date={date} />
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
      excerpt
      frontmatter {
        date
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
