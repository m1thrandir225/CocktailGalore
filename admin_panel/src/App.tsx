import { AuthProvider, RequireAuth } from "react-auth-kit";
import { SWRConfig } from "swr";
import ThemeProvider from "./context/ThemeContext";
import axiosInstance from "./lib/axios-interceptor";

import { Routes, Route } from "react-router-dom";
import ProtectedLayout from "./Layouts/ProtectedLayout";
import Login from "./Login";
import Dashboard from "./pages/Dashboard";
import Cocktails from "./pages/Cocktails";
import AddFlavour from "./pages/Flavours/AddFlavour";
import EditFlavour from "./pages/Flavours/EditFlavour";
import Flavours from "./pages/Flavours/Flavours";
import Insights from "./pages/Insights";
import Settings from "./pages/Settings";
import EditUser from "./pages/Users/EditUser";
import Users from "./pages/Users/Users";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth loginPath="/login">
            <ProtectedLayout>
              <Dashboard />
            </ProtectedLayout>
          </RequireAuth>
        }
      />
      <Route
        path="/cocktails"
        element={
          <RequireAuth loginPath="/login">
            <ProtectedLayout>
              <Cocktails />
            </ProtectedLayout>
          </RequireAuth>
        }
      />
      <Route
        path="/insights"
        element={
          <RequireAuth loginPath="/login">
            <ProtectedLayout>
              <Insights />
            </ProtectedLayout>
          </RequireAuth>
        }
      />
      <Route
        path="/flavours"
        element={
          <RequireAuth loginPath="/login">
            <ProtectedLayout>
              <Flavours />
            </ProtectedLayout>
          </RequireAuth>
        }
      />
      <Route
        path="/flavours/new"
        element={
          <RequireAuth loginPath="/login">
            <ProtectedLayout>
              <AddFlavour />
            </ProtectedLayout>
          </RequireAuth>
        }
      />
      <Route
        path="/flavours/flavour/:id"
        element={
          <RequireAuth loginPath="/login">
            <ProtectedLayout>
              <EditFlavour />
            </ProtectedLayout>
          </RequireAuth>
        }
      />
      <Route
        path="/users"
        element={
          <RequireAuth loginPath="/login">
            <ProtectedLayout>
              <Users />
            </ProtectedLayout>
          </RequireAuth>
        }
      />
      <Route
        path="/users/user/:id"
        element={
          <RequireAuth loginPath="/login">
            <ProtectedLayout>
              <EditUser />
            </ProtectedLayout>
          </RequireAuth>
        }
      />
      <Route
        path="/settings"
        element={
          <RequireAuth loginPath="/login">
            <ProtectedLayout>
              <Settings />
            </ProtectedLayout>
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
