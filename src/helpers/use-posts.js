import { useStaticQuery, graphql } from "gatsby"

const usePosts = () => {
  const {
    allMdx: { edges: demos },
  } = useStaticQuery(
    graphql`
      query {
        allMdx(filter: { frontmatter: { type: { eq: "post" } } }) {
          edges {
            node {
              excerpt
              frontmatter {
                slug
                title
                date
                # image {
                #   childImageSharp {
                #     fluid(maxWidth: 200) {
                #       ...GatsbyImageSharpFluid
                #     }
                #   }
                # }
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
        excerpt,
        frontmatter: { slug, title, date },
      },
    }) => ({
      slug,
      title,
      excerpt,
      date,
      // image: image?.childImageSharp?.fluid,
    })
  )
}

export default usePosts
