import { RequireAuth } from "react-auth-kit";
import { Route, Routes } from "react-router-dom";
import ProtectedLayout from "./Layouts/ProtectedLayout";
import Login from "./Login";
import AddCategory from "./pages/CocktailCategory/AddCategory";
import EditCategory from "./pages/CocktailCategory/EditCategory";
import AddCocktail from "./pages/Cocktails/AddCocktail";
import CocktailsPage from "./pages/Cocktails/Cocktails";
import EditCocktail from "./pages/Cocktails/EditCocktail";
import Dashboard from "./pages/Dashboard";
import AddFlavour from "./pages/Flavours/AddFlavour";
import EditFlavour from "./pages/Flavours/EditFlavour";
import Flavours from "./pages/Flavours/Flavours";
import AddInsight from "./pages/Insights/AddInsight";
import EditInsight from "./pages/Insights/EditInsight";
import Insights from "./pages/Insights/Insights";
import Settings from "./pages/Settings";
import EditUser from "./pages/Users/EditUser";
import Users from "./pages/Users/Users";
import CategoryPage from "./pages/CocktailCategory/Categories";
import Profile from "./pages/Profile";

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
              <CocktailsPage />
            </ProtectedLayout>
          </RequireAuth>
        }
      />
      <Route
        path="/cocktails/new"
        element={
          <RequireAuth loginPath="/login">
            <ProtectedLayout>
              <AddCocktail />
            </ProtectedLayout>
          </RequireAuth>
        }
      />
      <Route
        path="/cocktails/cocktail/:id"
        element={
          <RequireAuth loginPath="/login">
            <ProtectedLayout>
              <EditCocktail />
            </ProtectedLayout>
          </RequireAuth>
        }
      />
      <Route
        path="/categories"
        element={
          <RequireAuth loginPath="/login">
            <ProtectedLayout>
              <CategoryPage />
            </ProtectedLayout>
          </RequireAuth>
        }
      />
      <Route
        path="/categories/category/new"
        element={
          <RequireAuth loginPath="/login">
            <ProtectedLayout>
              <AddCategory />
            </ProtectedLayout>
          </RequireAuth>
        }
      />
      <Route
        path="/categories/category/:id"
        element={
          <RequireAuth loginPath="/login">
            <ProtectedLayout>
              <EditCategory />
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
        path="/insights/new"
        element={
          <RequireAuth loginPath="/login">
            <ProtectedLayout>
              <AddInsight />
            </ProtectedLayout>
          </RequireAuth>
        }
      />
      <Route
        path="/insights/insight/:id"
        element={
          <RequireAuth loginPath="/login">
            <ProtectedLayout>
              <EditInsight />
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
      <Route
        path="/profile"
        element={
          <RequireAuth loginPath="/login">
            <ProtectedLayout>
              <Profile />
            </ProtectedLayout>
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
