import { Outlet } from "react-router-dom";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Login } from "./Login";
import { AuthLayout } from "./Layouts/AuthLayout";
import ProtectedLayout from "./Layouts/ProtectedLayout";
import Dashboard from "./pages/Dashboard";
import Cocktails from "./pages/Cocktails";
import Settings from "./pages/Settings";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AuthLayout />}>
        <Route element={<Login />} path="/login" />
      </Route>
      <Route path="/" element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cocktails" element={<Cocktails />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
