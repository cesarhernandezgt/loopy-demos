import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { config } from "@fortawesome/fontawesome-svg-core"
import Layout from "./layout"
import Demo from "../components/demo-container"
import Breadcrumb from "./breadcrumb"
import DateTag from "../components/date-tag"

const DemoLayout = ({
  data: {
    mdx: {
      body,
      excerpt,
      frontmatter: {
        image,
        builder,
        model,
        pedalData,
        presetsData,
        date,
        slug,
      },
    },
  } = {
    mdx: {
      body: "",
      excerpt: "",
      frontmatter: {
        image: {},
        builder: "",
        model: "",
        pedalData: {},
        presetsData: {},
        date: "",
        slug: "",
      },
    },
  },
  location = {},
}) => {
  const pedal =
    pedalData?.internal?.content && JSON.parse(pedalData.internal.content)
  const { presets } =
    presetsData?.internal?.content && JSON.parse(presetsData.internal.content)

  pedal.image = image?.childImageSharp?.fluid

  const title = `${builder} - ${model}`

  return (
    <Layout location={location} title={title} description={excerpt}>
      <Breadcrumb label="All demos" />
      <h1>{title}</h1>
      <DateTag date={date} />
      <Demo presets={presets} pedals={[pedal]} slug={slug} />
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
        slug
        image {
          childImageSharp {
            fluid(maxHeight: 350) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        pedalData {
          internal {
            content
          }
        }
        presetsData {
          internal {
            content
          }
        }
      }
    }
  }
`
