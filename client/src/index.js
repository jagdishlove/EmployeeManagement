import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import "./index.css";
import { persistor, store } from "./redux/store/store";

// Create a palette
let theme = createTheme({
  palette: {
    primary: {
      main: "#008080", // Set your primary color here
    },
    secondary: {
      main: "#ffffff", // Set your secondary color here
    },
    gray: {
      main: "#6F7071", // Custom color 1
    },
    lightGray: {
      main: "#F3F7FB",
    },
    black: {
      main: "#000",
    },
    red: {
      main: "#FF0000",
    },
  },
  typography: {
    fontFamily: "Nunito Sans, sans-serif", // Replace 'Your Custom Font Name' with the name of your custom font
    h1: {
      fontSize: "40px",
      fontWeight: 800, // Set your default font size for h1
    },
    h2: {
      fontSize: "30px",
      fontWeight: 800, // Set your default font size for h2
    },
    h3: {
      fontSize: "22px", // Set your default font size for h3
      fontWeight: "400 !important",
    },
    h6: {
      fontSize: "18px",
      fontWeight: "400 !important",
    },
    link: {
      color: "secondary",
    },
  },
});

theme = responsiveFontSizes(theme, {
  breakpoints: ["sm", "md", "lg"], // Add your desired breakpoints here
  factors: [2, 1.5, 1.1], // Add the desired factors for each breakpoint
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
