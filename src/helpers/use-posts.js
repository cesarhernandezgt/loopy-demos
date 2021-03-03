import { useStaticQuery, graphql } from "gatsby"

const usePosts = () => {
  const {
    allMdx: { edges: posts },
  } = useStaticQuery(
    graphql`
      query {
        allMdx(
          filter: {
            frontmatter: { unpublished: { ne: true }, type: { eq: "post" } }
          }
          sort: { fields: frontmatter___date, order: DESC }
        ) {
          edges {
            node {
              excerpt
              slug
              frontmatter {
                title
                date
                featuredImage {
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

  return posts.map(
    ({
      node: {
        excerpt,
        slug,
        frontmatter: { title, date, featuredImage },
      },
    }) => ({
      slug,
      title,
      excerpt,
      date,
      image: featuredImage?.childImageSharp?.fluid,
    })
  )
}

export default usePosts
