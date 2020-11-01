import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Pedal from "../components/pedal"

const audioFiles = ["/riff-without-drums.wav", "/riff-with-drums.wav"]

const IndexPage = () => {
  const [riffs] = useState(
    audioFiles.map(file => {
      const riff = new Audio(file)
      riff.loop = true
      riff.muted = true
      return riff
    })
  )
  const [riffIndex, setRiffIndex] = useState(1)

  useEffect(() => {
    if (riffs[riffIndex]) {
      riffs.forEach(riff => {
        riff.muted = true
      })
      riffs[riffIndex].muted = false
    }
  }, [riffIndex, riffs])

  const play = () => {
    riffs.forEach(riff => {
      riff.play()
    })
  }

  const stop = () => {
    riffs.forEach(riff => {
      riff.pause()
    })
  }

  const changeRiff = () => {
    setRiffIndex(riffIndex === 0 ? 1 : 0)
  }

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <Pedal />
      <button
        type="button"
        onClick={() => {
          play()
        }}
      >
        Play Riff!
      </button>
      <button
        type="button"
        onClick={() => {
          stop()
        }}
      >
        Stop Riff!
      </button>
      <button
        type="button"
        onMouseDown={() => {
          changeRiff()
        }}
      >
        Change Riff!
      </button>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </Layout>
  )
}

export default IndexPage
