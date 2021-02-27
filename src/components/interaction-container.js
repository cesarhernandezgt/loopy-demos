import React from "react"
import styled from "styled-components"
import COLORS from "./styles/colors"

const StyledInteractionContainer = styled.div`
  position: relative;
  z-index: 1;
  --glow: ${props => props.color};
  --size: ${props => props.size}px;
  --scaleX: ${props => props.aspectRatio.x};
  --scaleY: ${props => props.aspectRatio.y};
  width: var(--size);
  height: var(--size);

  &:after {
    position: absolute;
    top: -16px;
    left: -16px;
    content: " ";
    width: calc(var(--size) + 32px);
    height: calc(var(--size) + 32px);
    background: radial-gradient(
      var(--glow) calc(var(--size) / 2),
      rgba(0, 0, 0, 0) calc((var(--size) + 32px) / 2)
    );
    border-radius: 50%;
    z-index: -1;
    transform: scale(var(--scaleX), var(--scaleY));
    transition: opacity 0.2s ease-in;
  }

  &:hover {
    &:after {
      opacity: 0.5;
    }
  }

  ${props => props.extraCSS}
`

const InteractionContainer = ({
  color = "pink",
  size = "64",
  extraCSS = "",
  children = null,
  isHidden = false,
  aspectRatio = { x: 1, y: 1 },
  ...rest
}) =>
  isHidden ? (
    children
  ) : (
    <StyledInteractionContainer
      size={size}
      color={COLORS[color]}
      extraCSS={extraCSS}
      aspectRatio={aspectRatio}
      {...rest}
    >
      {children}
    </StyledInteractionContainer>
  )

export default InteractionContainer
