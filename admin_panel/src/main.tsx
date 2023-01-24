import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "react-auth-kit";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider authType="localstorage" authName="_auth">
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
