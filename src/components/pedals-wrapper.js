import React, { useRef } from "react"
import styled from "styled-components"
import Img from "gatsby-image"

import Pedal from "./pedal"
import PedalConfigInjector from "./pedal-config-injector"

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
  flex-flow: row nowrap;
  align-items: center;
  margin: 0;
  padding: 0;

  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: 0;
  scrollbar-color: transparent transparent;

  ::-webkit-scrollbar {
    display: none;
  }
`

const StyledThumbnailItem = styled.li`
  list-style: none;
  flex: 0 0 100px;
  height: 100px;
  position: relative;
  background: var(--dark);
  border: 1px solid ${props => (props.active ? "var(--cyan)" : "var(--dark)")};
  opacity: ${props => (props.active ? 1 : 0.3)};
  margin-right: 4px;
  border-radius: 4px;
  padding: 0.5rem;
  scroll-snap-align: start;

  button {
    height: 100%;
    width: 100%;
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

const ThumbnailItem = ({ image = {}, name = "" }) => {
  const { activePedal, setActivePedal } = useDemoState()
  const itemRef = useRef(null)

  const handleClick = () => {
    setActivePedal(name)
    itemRef.current.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    })
  }

  return (
    <StyledThumbnailItem key={name} active={activePedal === name} ref={itemRef}>
      <button type="button" onClick={handleClick}>
        <Img
          fluid={image}
          style={{
            height: "100%",
            width: "100%",
          }}
          imgStyle={{
            objectFit: "contain",
          }}
        />
      </button>
    </StyledThumbnailItem>
  )
}

const ComparisonWrapper = ({ children = null, pedals = [] }) => {
  const { activePedal } = useDemoState()

  return (
    <LayoutWrapper>
      <ComparisonThumbnailRow>
        {pedals.map(({ image, name }) => (
          <ThumbnailItem key={name} image={image} name={name} />
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
      {pedals.map(({ name, controls, image, alignment, scale, isDevMode }) => {
        const HydratedPedal = props => (
          <Pedal
            key={name}
            name={name}
            {...controls}
            image={image}
            alignment={alignment}
            scale={scale}
            {...props}
          />
        )
        return isDevMode ? (
          <PedalConfigInjector key={name} config={controls}>
            <HydratedPedal />
          </PedalConfigInjector>
        ) : (
          <HydratedPedal />
        )
      })}
    </Wrapper>
  )
}

export default PedalsWrapper
