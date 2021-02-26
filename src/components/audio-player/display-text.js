import React from "react"

const DisplayText = ({
  isPlaying = false,
  isDisabled = false,
  isLoading = true,
  isPedalOn = false,
  hasError = false,
}) => {
  let text = ``

  if (isLoading) {
    text = `Loading sounds. Try a preset below?`
  }

  if (!isPlaying) {
    text = `Hit play and wear some headphones d[-_-]b`
  }

  if (isDisabled) {
    text = `Sorry, your browser sucks ¯\\_(ツ)_/¯`
  }

  if (isPlaying && !isLoading && !isPedalOn) {
    text = `Here's my clean tone. Turn the pedal on.`
  }

  if (hasError) {
    text = `Error loading sounds. Try reloading the page.*`
  }

  return <span>{text}</span>
}

export default DisplayText
