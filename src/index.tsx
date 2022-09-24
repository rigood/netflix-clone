import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <QueryClientProvider client={client}>
    <App />
    <ReactQueryDevtools position="bottom-right" />
  </QueryClientProvider>
);
