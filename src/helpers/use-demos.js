import { useStaticQuery, graphql } from "gatsby"

const useDemos = () => {
  const {
    allMdx: { edges: demos },
  } = useStaticQuery(
    graphql`
      query {
        allMdx(
          filter: {
            frontmatter: { unpublished: { ne: true }, type: { eq: "demo" } }
          }
          sort: { fields: frontmatter___date, order: DESC }
        ) {
          edges {
            node {
              slug
              frontmatter {
                builder
                model
                image {
                  childImageSharp {
                    fluid(maxWidth: 188) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  )

  return demos.map(
    ({
      node: {
        slug,
        frontmatter: { builder, model, image },
      },
    }) => ({
      slug,
      builder,
      model,
      image: image?.childImageSharp?.fluid,
    })
  )
}

export default useDemos
