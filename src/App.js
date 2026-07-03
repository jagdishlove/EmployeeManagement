import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Toast from "./components/toast/toast";
import Router from "./routes/router";
import FullScreenLoader from "./components/fullScreenLoader/FullScreenLoader";

function App() {
  return (
    <>
      <Toast />
      <FullScreenLoader />
      <Router />
    </>
  );
}

export default App;
