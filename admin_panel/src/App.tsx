import { AuthProvider, RequireAuth } from "react-auth-kit";
import { SWRConfig } from "swr";
import ThemeProvider from "./context/ThemeContext";
import axiosInstance from "./lib/axios-interceptor";

import { Routes, Route } from "react-router-dom";
import ProtectedLayout from "./Layouts/ProtectedLayout";
import Login from "./Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
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
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
