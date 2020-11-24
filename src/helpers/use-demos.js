import { useStaticQuery, graphql } from "gatsby"

const useDemos = () => {
  const {
    allMdx: { edges: demos },
  } = useStaticQuery(
    graphql`
      query {
        allMdx(filter: { frontmatter: { type: { eq: "demo" } } }) {
          edges {
            node {
              frontmatter {
                slug
                builder
                model
                image {
                  childImageSharp {
                    fluid(maxWidth: 200) {
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
        frontmatter: { slug, builder, model, image },
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
