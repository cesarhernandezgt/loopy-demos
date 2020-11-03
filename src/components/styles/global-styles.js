import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    background: #282a36;
    color: white;
  }

  * {
    font-family: "Source Sans Pro", "Arial", sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Source Sans Pro", "Arial Black", sans-serif;
    color:#FFFF80;
    font-weight: 900;
  }

  button {
    outline: none;
    border: none;
    background: none;
  }
`

export default GlobalStyles
