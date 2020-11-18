import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  @keyframes blink {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  :root {
    --blinkAnimation: blink 2s ease-in-out infinite;
    --spinAnimation: spin 1s linear infinite;
  }


  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* background: #282a36; */
    background: #383a59;
    color: white;
  }


  p {
    font-size: 1.2rem;
    line-height: 1.5rem;
  }

  @media screen and (min-width: 1024px) {
    p {
      font-size: 1.4rem;
      line-height: 1.7rem;
    }
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
    font-family: 'Sigmar One', cursive;
    color:#FFFF80;
    overflow-wrap: break-word;
    line-height: 2rem;
  }


  button {
    outline: none;
    border: none;
    background: none;
    padding: 0;
  }

  a {
    text-decoration: none;
  }
`

export default GlobalStyles
