import React from "react"
import { Link } from "gatsby"

const MarkdownLink = ({ href = "", ...rest }) => {
  if (href.startsWith("/")) {
    return <Link data-link-internal to={href} {...rest} />
  }

  // Treat urls that aren't web protocols as "normal" links
  if (!href.startsWith("http")) {
    return <a href={href} {...rest} /> // eslint-disable-line jsx-a11y/anchor-has-content
  }

  return (
    <a // eslint-disable-line jsx-a11y/anchor-has-content
      data-link-external
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      {...rest}
    />
  )
}

export default MarkdownLink
