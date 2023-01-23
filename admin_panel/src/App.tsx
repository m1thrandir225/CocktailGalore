import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigate,
} from "react-router-dom";
import { AuthLayout } from "./Layouts/AuthLayout";
import ProtectedLayout from "./Layouts/ProtectedLayout";
import { Login } from "./Login";
import { AuthProvider } from "./context/AuthContex";
import Cocktails from "./pages/Cocktails";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import ThemeProvider from "./context/ThemeContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<ProtectedLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/cocktails" element={<Cocktails />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
