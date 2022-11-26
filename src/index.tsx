import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "styled-components";
import { RouterProvider } from "react-router-dom";

import router from "./Router";
import GlobalStyle from "./styles/GlobalStyle";
import { theme } from "./styles/theme";

const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <RecoilRoot>
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  </RecoilRoot>
);
