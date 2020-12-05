import React from "react"

const DisplayText = ({
  isPlaying = false,
  isDisabled = false,
  isLoading = true,
}) => {
  let text = ``

  if (isLoading) {
    text = `Loading my clean tone. Maybe click a preset below ⬇?`
  }

  if (!isPlaying) {
    text = `Hit play and wear some headphones d[-_-]b`
  }

  if (isDisabled) {
    text = `Sorry, your browser sucks and won't let you play this audio ¯\\_(ツ)_/¯`
  }

  return <span>{text}</span>
}

export default DisplayText
