import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Demo from "../../components/demo-container"

const getImageData = (images, name) =>
  images.find(image => image.node.name === name)?.node?.childImageSharp?.fluid

const GatedFuzzComparison = () => {
  const imageData = useStaticQuery(graphql`
    query GatedFuzzImagesQuery {
      allFile(
        filter: {
          relativePath: {
            in: [
              "earthquaker-devices-plumes.png"
              "smallsound-bigsound-mini.png"
              "jhs-pedals-mini-foot-fuzz-v2.png"
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
    }
  `)

  const images = imageData.allFile.edges

  return (
    <Demo
      slug="gated-fuzz-comparison"
      type="comparison"
      presets={[]}
      pedals={[
        {
          name: "earthquaker-devices-plumes",
          image: getImageData(images, "earthquaker-devices-plumes"),
          controls: {
            knobs: [
              {
                id: "level",
                size: 56,
                position: {
                  top: 50,
                  left: 68,
                },
              },
              {
                id: "tone",
                size: 60,
                position: {
                  top: 106,
                  left: 122,
                },
              },
              {
                id: "gain",
                size: 60,
                position: {
                  top: 48,
                  left: 176,
                },
              },
            ],
            leds: [
              {
                id: "on_led",
                size: 38,
                position: {
                  top: 252,
                  left: 78,
                },
                colors: {
                  off: "#d2e1e9a1",
                  on: "#d4f9ff",
                },
              },
            ],
            switches: [
              {
                id: "bypass_switch",
                size: 48,
                position: {
                  top: 246,
                  left: 126,
                },
              },
              {
                id: "mode",
                size: 32,
                orientation: "horizontal",
                position: {
                  top: 64,
                  left: 134,
                },
                type: "toggle",
              },
            ],
          },
        },
        {
          name: "smallsound-bigsound-mini",
          image: getImageData(images, "smallsound-bigsound-mini"),
          controls: {
            knobs: [
              { id: "gain", size: 72, position: { top: 4, left: 66 } },
              { id: "volume", size: 72, position: { top: 4, left: 168 } },
              { id: "bias", size: 56, position: { top: 67, left: 124 } },
              { id: "bass", size: 56, position: { top: 125, left: 74 } },
              {
                id: "treble",
                size: 56,
                position: { top: 127, left: 175 },
              },
            ],
            leds: [
              {
                id: "on_led",
                size: 36,
                position: { top: 138, left: 133 },
              },
            ],
            switches: [
              {
                id: "bypass_switch",
                size: 59,
                position: { top: 275, left: 122 },
              },
            ],
          },
        },
        {
          name: "jhs-pedals-mini-foot-fuzz-v2",
          image: getImageData(images, "jhs-pedals-mini-foot-fuzz-v2"),
          controls: {
            knobs: [
              {
                id: "volume",
                size: 62,
                type: "jhs",
                colors: {
                  primary: "#3eb255",
                  secondary: "#7dce8e",
                  tick: "white",
                },
                position: {
                  top: 57,
                  left: 83,
                },
              },
              {
                id: "fuzz",
                size: 62,
                type: "jhs",
                colors: {
                  primary: "#3eb255",
                  secondary: "#7dce8e",
                  tick: "white",
                },
                position: {
                  top: 57,
                  left: 156,
                },
              },
            ],
            leds: [
              {
                id: "on_led",
                size: 46,
                socket: true,
                position: {
                  top: 171,
                  left: 168,
                },
                colors: {
                  off: "green",
                  on: "springgreen",
                  socket: "black",
                },
              },
            ],
            switches: [
              {
                id: "bypass_switch",
                size: 56,
                position: {
                  top: 277,
                  left: 122,
                },
              },
              {
                id: "mode",
                size: 38,
                orientation: "horizontal",
                position: {
                  top: 26,
                  left: 130,
                },
                type: "toggle",
              },
            ],
          },
        },
      ]}
    />
  )
}

export default GatedFuzzComparison
