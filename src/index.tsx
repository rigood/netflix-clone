import React from "react";
import ReactDOM from "react-dom/client";

/* Statement-management */
import { RecoilRoot } from "recoil";

/* Data-fetching */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/* Theme-color */
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

/* Global-style */
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

/* Components */
import App from "./App";

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
`;

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <RecoilRoot>
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  </RecoilRoot>
);
