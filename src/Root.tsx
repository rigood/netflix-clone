import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Modal from "./components/Modal";

function Root() {
  return (
    <>
      <Header />
      <Outlet />
      <Modal />
      <ToastContainer theme="colored" />
    </>
  );
}

export default Root;
