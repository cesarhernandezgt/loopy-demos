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
      slug,
      title,
      excerpt,
      date,
    })
  )
}

export default usePosts
