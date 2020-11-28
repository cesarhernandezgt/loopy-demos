const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            slug
            frontmatter {
              type
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  const demos = result.data.allMdx.edges
  demos
    .filter(({ node }) => node.frontmatter.type === "demo")
    .forEach(({ node }) => {
      const pathname = `/demos/${node.slug}`
      createPage({
        path: pathname,
        component: path.resolve(`./src/templates/demo-layout.js`),
        context: { id: node.id },
      })
    })

  demos
    .filter(({ node }) => node.frontmatter.type === "post")
    .forEach(({ node }) => {
      const pathname = `/posts/${node.slug}`
      createPage({
        path: pathname,
        component: path.resolve(`./src/templates/post-layout.js`),
        context: { id: node.id },
      })
    })
}
