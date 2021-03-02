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
    }
  `)

  const images = imageData.allFile.edges

  return (
    <Demo
      slug="velcro-fuzz-shootout"
      type="comparison"
      presets={[
        {
          id: "aggressive",
          label: "Aggressive",
          "tone-electronix-animalizzer": {
            id: "animalizer_aggressive",
            settings: {
              bass: 3,
              mid: 4,
              treble: 9,
              volume: 4,
              depth: 10,
              fuzz: 10,
              pre_gain: 10,
              stage_i: 2,
              stage_ii: 1,
            },
          },
          "jhs-pedals-mini-foot-fuzz-v2": {
            id: "jhs_mini_foot_fuzz_aggressive",
            settings: {
              volume: 6,
              fuzz: 10,
              mode: 3,
            },
          },
          "smallsound-bigsound-mini": {
            id: "ssbs_mini_aggressive",
            settings: { gain: 10, bass: 7, treble: 8, bias: 3, volume: 4 },
          },
        },
        {
          id: "tamed",
          label: "Tamed",
          "tone-electronix-animalizzer": {
            id: "aggressive_animalizzer",
            settings: {
              bass: 3,
              mid: 4,
              treble: 9,
              volume: 4,
              depth: 10,
              fuzz: 7,
              pre_gain: 7,
              stage_i: 2,
              stage_ii: 1,
            },
          },
          "jhs-pedals-mini-foot-fuzz-v2": {
            id: "jhs_mini_foot_fuzz_aggressive",
            settings: {
              volume: 6,
              fuzz: 7,
              mode: 3,
            },
          },
          "smallsound-bigsound-mini": {
            id: "ssbs_mini_aggressive",
            settings: { gain: 7, bass: 10, treble: 7, bias: 2, volume: 4 },
          },
        },
      ]}
      pedals={[
        {
          name: "tone-electronix-animalizzer",
          image: getImageData(images, "tone-electronix-animalizzer"),
          controls: {
            knobs: [
              {
                id: "bass",
                size: 70,
                position: {
                  top: 1,
                  left: 10,
                },
                type: "walrus",
              },
              {
                id: "mid",
                size: 70,
                position: {
                  top: 1,
                  left: 118,
                },
                type: "walrus",
              },
              {
                id: "treble",
                size: 70,
                position: {
                  top: 2,
                  left: 226,
                },
                type: "walrus",
              },
              {
                id: "volume",
                size: 48,
                position: {
                  top: 110,
                  left: 15,
                },
                type: "walrus",
              },
              {
                id: "depth",
                size: 48,
                position: {
                  top: 110,
                  left: 243,
                },
                type: "walrus",
              },
              {
                id: "fuzz",
                size: 48,
                position: {
                  top: 178,
                  left: 16,
                },
                type: "walrus",
              },
              {
                id: "stage_ii",
                size: 48,
                isRotary: true,
                rotaryAngles: [-106, -150, 150, 106],
                position: {
                  top: 179,
                  left: 129,
                },
                type: "walrus",
              },
              {
                id: "pre_gain",
                size: 48,
                position: {
                  top: 175,
                  left: 240,
                },
                type: "walrus",
              },
            ],
            leds: [
              {
                id: "on_led",
                size: 32,
                position: {
                  top: 288,
                  left: 78,
                },
                socket: true,
                colors: {
                  socket: "black",
                  on: "#f73333",
                  off: "#800000a1",
                },
              },
            ],
            switches: [
              {
                id: "bypass_switch",
                size: 56,
                position: {
                  top: 279,
                  left: 122,
                },
              },
              {
                id: "stage_i",
                type: "toggle",
                size: 30,
                position: {
                  top: 124,
                  left: 138,
                },
                orientation: "horizontal",
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
      ]}
    />
  )
}

export default GatedFuzzComparison
