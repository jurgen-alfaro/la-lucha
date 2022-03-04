import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { LoginProvider } from "./context/login/LoginContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <App />
      </LoginProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
