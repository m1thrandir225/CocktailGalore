import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "react-auth-kit";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthProvider authType="localstorage" authName="_auth">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>,
);
