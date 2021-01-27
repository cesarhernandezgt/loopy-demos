import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"

import Pedal from "./pedal"

import useDemoState from "../helpers/use-demo-state"

const centerMixin = `
  display: flex;
  justify-content: center;

  > {
    flex: 1 0 auto;
  }
`

const LayoutWrapper = styled.div`
  margin: 1rem auto 2rem;
`

const SingleWrapper = styled(LayoutWrapper)`
  ${centerMixin}
`

const ComparisonOuterWrapper = styled.div`
  overflow: hidden;
  position: relative;
  height: 350px;
  width: 300px;
  margin: 1rem auto 0;
`

const ComparisonInnerWrapper = styled.div`
  ${centerMixin}
  position: absolute;
  top: 0;
  left: ${props => props.leftShift};
`

const CombinationWrapper = styled.div`
  display: flex;
  justify-content: center;

  > {
    flex: 1 0 auto;
  }
`
const ComparisonThumbnailRow = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;

  li {
    list-style: none;
    flex: 0 0 80px;
    height: 100px;
    position: relative;
  }
`

const calcPedalPosition = (pedals = [], activePedalName = "") => {
  const activeIndex = pedals.findIndex(({ name }) => name === activePedalName)

  const leftShift = pedals.reduce((acc, curr, index) => {
    if (index >= activeIndex) return acc

    return acc + (curr.width || 300)
  }, 0)

  return `-${leftShift}px`
}

const ComparisonWrapper = ({ children = null, pedals = [] }) => {
  const { activePedal, setActivePedal } = useDemoState()
  return (
    <LayoutWrapper>
      <ComparisonThumbnailRow>
        {pedals.map(({ image, name }) => (
          <li key={name}>
            <button type="button" onClick={() => setActivePedal(name)}>
              <Img
                fluid={image}
                style={{
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  opacity: activePedal === name ? 1 : 0.3,
                }}
                imgStyle={{
                  objectFit: "contain",
                }}
              />
            </button>
          </li>
        ))}
      </ComparisonThumbnailRow>
      <ComparisonOuterWrapper>
        <ComparisonInnerWrapper
          leftShift={calcPedalPosition(pedals, activePedal)}
        >
          {children}
        </ComparisonInnerWrapper>
      </ComparisonOuterWrapper>
    </LayoutWrapper>
  )
}

const PedalsWrapper = ({ type = "single", pedals = [] }) => {
  const Wrapper = {
    single: SingleWrapper,
    combination: CombinationWrapper,
    comparison: ComparisonWrapper,
  }[type]

  return (
    <Wrapper pedals={pedals}>
      {pedals.map(({ name, controls, image, alignment, scale }) => (
        <Pedal
          key={name}
          name={name}
          {...controls}
          image={image}
          alignment={alignment}
          scale={scale}
        />
      ))}
    </Wrapper>
  )
}

export default PedalsWrapper
