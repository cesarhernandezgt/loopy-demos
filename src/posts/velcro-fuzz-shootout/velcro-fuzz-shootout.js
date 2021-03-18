import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Demo from "../../components/demo-container"

const getImageData = (images, name) =>
  images.find(image => image.node.name === name)?.node?.childImageSharp?.fluid

const VelcroFuzzShootout = () => {
  const data = useStaticQuery(graphql`
    query VelcroFuzzShootoutQuery {
      images: allFile(
        filter: {
          relativePath: {
            in: [
              "tone-electronix-animalizzer.webp"
              "smallsound-bigsound-mini.webp"
              "jhs-pedals-mini-foot-fuzz-v2.webp"
            ]
          }
        }
      ) {
        edges {
          node {
            name
            childImageSharp {
              fluid(maxHeight: 350) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
      pedals: allFile(
        filter: {
          relativePath: {
            in: [
              "tone-electronix-animalizzer.pedal.json"
              "smallsound-bigsound-mini.pedal.json"
              "jhs-pedals-mini-foot-fuzz-v2.pedal.json"
            ]
          }
        }
      ) {
        edges {
          node {
            internal {
              content
            }
          }
        }
      }
      presets: allFile(
        filter: { relativePath: { eq: "velcro-fuzz-shootout.presets.json" } }
      ) {
        edges {
          node {
            internal {
              content
            }
          }
        }
      }
    }
  `)

  const images = data.images.edges

  const pedals = data.pedals.edges.map(pedalData => {
    const pedal = JSON.parse(pedalData?.node?.internal?.content)
    pedal.image = getImageData(images, pedal.name)
    return pedal
  })

  const { presets } = JSON.parse(data.presets.edges[0].node.internal.content)

  return (
    <Demo
      slug="velcro-fuzz-shootout"
      type="comparison"
      presets={presets}
      pedals={pedals}
    />
  )
}

export default VelcroFuzzShootout
