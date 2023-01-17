import { Route, Routes, useLocation, useNavigate } from "@solidjs/router";
import { Component, createEffect, createMemo } from "solid-js";
import { GlobalProvider } from "./context/globalContext";
import Login from "./scenes/Login";

import Sidebar from "./Components/globals/Sidebar";
import Cocktails from "./scenes/Cocktails";
import Dashboard from "./scenes/Dashboard";
import Insights from "./scenes/Insights";
import Flavours from "./scenes/Flavours";
import Users from "./scenes/Users";
import Settings from "./scenes/Settings";
const App: Component = () => {
  const navigate = useNavigate();
  const currentLocation = useLocation();

  createEffect(() => {
    if (localStorage.getItem("isAuth") != "true") {
      navigate("/login", { replace: true });
    }
  });
  return (
    <GlobalProvider>
      <div class="dark:bg-indigo-800">
        <main class="flex flex-row justify-start items-start">
          {currentLocation.pathname !== "/login" && <Sidebar />}

          <Routes>
            <Route path="/login" component={Login} />
            <Route path="/" component={Dashboard} />
            <Route path="/cocktails" component={Cocktails} />
            <Route path="/insights" component={Insights} />
            <Route path="/flavours" component={Flavours} />
            <Route path="/users" component={Users} />
            <Route path="/settings" component={Settings} />
          </Routes>
        </main>
      </div>
    </GlobalProvider>
  );
};

export default App;
