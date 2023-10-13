import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Layout from "../layout/Layout";
import { Dashboard, Home, Login, ManageTeam, NotFound } from "../pages";
import ProtectComponent from "./ProtectComponent";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectComponent>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectComponent>
        }
      />

      <Route
        path="/manage-team"
        element={
          <ProtectComponent>
            <Layout>
              <ManageTeam />
            </Layout>
          </ProtectComponent>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
