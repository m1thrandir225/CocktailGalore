import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigate,
} from "react-router-dom";
import ProtectedLayout from "./Layouts/ProtectedLayout";
import { Login } from "./Login";
import Cocktails from "./pages/Cocktails";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import ThemeProvider from "./context/ThemeContext";
import Insights from "./pages/Insights";
import Flavours from "./pages/Flavours";
import Users from "./pages/Users";
import MyProfile from "./pages/MyProfile";
import { RequireAuth } from "react-auth-kit";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
