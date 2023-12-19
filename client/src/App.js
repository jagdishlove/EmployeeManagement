import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Toast from "./components/toast/toast";
import Router from "./routes/router";


function App() {
  return (
    <>
      <Toast />
      <Router />
    </>
  );
}

export default App;
