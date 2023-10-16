import React, { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import useGetUserInfo from "../hooks/useGetUserInfo";
import LoadingAndErrorComponent from "../components/LoadingAndErrorComponent";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { userId } = useAuth();
  const { isLoading, isError, error } = useGetUserInfo(userId!);
  console.log("layout", userId);
  return (
    <div className="container-fluid">
      <LoadingAndErrorComponent
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
      <div className="layout-container">
        <header>
          <h1>Bienvenido a la Liga de Fútbol Femenino</h1>
        </header>
        <main>
          <div className="container">{children}</div>
        </main>
        <footer>
          {/* <p>Todos los derechos reservados. Liga de Fútbol Femenino 2023.</p> */}
        </footer>
      </div>
    </div>
  );
};

export default Layout;
