import { toast } from "react-toastify";

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
