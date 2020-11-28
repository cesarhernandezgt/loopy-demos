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
      createPage({
        path: `/demos/${node.slug}`,
        component: path.resolve(`./src/templates/demo-layout.js`),
        context: { id: node.id },
      })
    })

  demos
    .filter(({ node }) => node.frontmatter.type === "post")
    .forEach(({ node }) => {
      createPage({
        path: `/posts/${node.slug}`,
        component: path.resolve(`./src/templates/post-layout.js`),
        context: { id: node.id },
      })
    })
}
