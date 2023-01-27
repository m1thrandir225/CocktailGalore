import React from "react";
import { AuthProvider } from "react-auth-kit";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import ThemeProvider from "./context/ThemeContext";
import { SWRConfig } from "swr";
import axiosInstance from "./lib/axios-interceptor";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider authType="localstorage" authName="_auth">
      <ThemeProvider>
        <SWRConfig
          value={{
            fetcher: (url) => axiosInstance.get(url).then((res) => res.data),
          }}
        >
          <HashRouter>
            <App />
          </HashRouter>
        </SWRConfig>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
);
