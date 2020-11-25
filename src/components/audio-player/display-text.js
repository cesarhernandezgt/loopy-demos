import React from "react"

const DisplayText = ({
  activePreset: { description, label } = { description: "", label: "" },
  isPlaying = false,
  isPedalOn = false,
}) => {
  let text = description || label

  if (!isPedalOn && isPlaying) {
    text = "Here's ma clean tone."
  }

  if (!isPlaying) {
    text = "Hit play and wear some headphones d[-_-]b"
  }

  return <span>{text}</span>
}

export default DisplayText
