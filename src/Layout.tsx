import { ThemeProvider } from "styled-components";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GlobalStyle from "./styles/GlobalStyle";
import { theme } from "./styles/theme";
import "./toast";

import Header from "./components/Header";
import Modal from "./pages/Modal";

function Layout() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Outlet />
        <Modal />
        <ToastContainer theme="colored" />
      </ThemeProvider>
    </>
  );
}

export default Layout;
