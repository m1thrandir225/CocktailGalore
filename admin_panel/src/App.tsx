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
import Flavours from "./pages/Flavours/Flavours";
import Users from "./pages/Users/Users";
import MyProfile from "./pages/MyProfile";
import EditFlavour from "./pages/Flavours/EditFlavour";
import { RequireAuth } from "react-auth-kit";
import { SWRConfig } from "swr";
import axiosInstance from "./lib/axios-interceptor";
import AddFlavour from "./pages/Flavours/AddFlavour";
import EditUser from "./pages/Users/EditUser";

function App() {
  return (
    <ThemeProvider>
      <SWRConfig
        value={{
          fetcher: (url: string) => axiosInstance(url).then((r) => r.data),
        }}
      >
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
        </BrowserRouter>
      </SWRConfig>
    </ThemeProvider>
  );
}

export default App;
