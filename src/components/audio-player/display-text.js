import React from "react"

const DisplayText = ({
  activePreset: { description, label } = { description: "", label: "" },
  isPlaying = false,
  isPedalOn = false,
  isDisabled = false,
}) => {
  let text = description || label

  if (!isPedalOn && isPlaying) {
    text = "Here's ma clean tone."
  }

  if (!isPlaying) {
    text = "Hit play and wear some headphones d[-_-]b"
  }

  if (isDisabled) {
    text =
      "Sorry, your browser sucks and won't let you play this audio ¯\\_(ツ)_/¯"
  }

  return <span>{text}</span>
}

export default DisplayText
