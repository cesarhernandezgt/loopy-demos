import React from "react"
import styled from "styled-components"
import COLORS from "./styles/colors"

const StyledInteractionContainer = styled.div`
  position: relative;
  z-index: 1;
  --glow: ${props => props.color};
  --size: ${props => props.size}px;
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
  }

  ${props => props.extraCSS}
`

const InteractionContainer = ({
  color = "pink",
  size = "64",
  extraCSS = "",
  children = null,
  isHidden = false,
  ...rest
}) =>
  isHidden ? (
    children
  ) : (
    <StyledInteractionContainer
      size={size}
      color={COLORS[color]}
      extraCSS={extraCSS}
      {...rest}
    >
      {children}
    </StyledInteractionContainer>
  )

export default InteractionContainer
