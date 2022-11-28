import { ThemeProvider } from "styled-components";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GlobalStyle from "./styles/GlobalStyle";
import { theme } from "./styles/theme";

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

const options = {
  position: toast.POSITION.TOP_CENTER,
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const toastMsg = (type: "SUCCESS" | "WARN" | "ERROR", msg: string) => {
  switch (type) {
    case "SUCCESS":
      toast.success(msg, options);
      break;
    case "WARN":
      toast.warn(msg, options);
      break;
    case "ERROR":
      toast.error(msg, options);
      break;
  }
};
