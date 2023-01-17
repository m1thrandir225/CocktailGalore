/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";
import { Route, Router, Routes } from "@solidjs/router";
import App from "./App";
import Login from "./scenes/Login";
import { GlobalProvider } from "./context/globalContext";

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  if (localStorage.getItem("darkMode") === null) {
    localStorage.setItem("darkMode", "true");
  }
} else {
  if (localStorage.getItem("darkMode") === null) {
    localStorage.setItem("darkMode", "false");
  }
}

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById("root") as HTMLElement,
);
