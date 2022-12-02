import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset};

*, *::before, *::after {
  box-sizing: border-box;
}

body {
  overflow-x: hidden;
  background-color: black;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700; // (300light, 500medium, 700bold)
  color: white;
  line-height: 1.5;
}

a {
  text-decoration: none;
  font-size: inherit;
  color: inherit;
}

`;

export default GlobalStyle;
