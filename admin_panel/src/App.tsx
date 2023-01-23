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
import Insights from "./pages/Insights";
import Flavours from "./pages/Flavours";
import Users from "./pages/Users";
import MyProfile from "./pages/MyProfile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cocktails" element={<Cocktails />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/flavours" element={<Flavours />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<MyProfile />} />
        </Route>
      </Route>
    </>,
  ),
);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
