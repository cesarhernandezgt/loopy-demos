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
              slug
              frontmatter {
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
        slug,
        frontmatter: { title, date },
      },
    }) => ({
      slug: slug.split("/")[1],
      title,
      excerpt,
      date,
      // image: image?.childImageSharp?.fluid,
    })
  )
}

export default usePosts
