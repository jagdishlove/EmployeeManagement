import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Toast() {
  return (
    <div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default Toast;
