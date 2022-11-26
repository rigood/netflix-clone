import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset};
* {
  box-sizing: border-box;
}
body {
  overflow-x: hidden;
  background-color: black;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700; // (300light, 500medium, 700bold)
  color: ${(props) => props.theme.white.darker};
  line-height: 1.5;
}
a {
  text-decoration: none;
  color: inherit;
}
.no-scroll{
  overflow-y: hidden;
}
.scroll-width{
  width: calc(100% - 17px);
}
`;

export default GlobalStyle;
