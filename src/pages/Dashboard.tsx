import { useAuth } from "../context/AuthContext";
import Layout from "../layout/Layout";
import { Link } from "react-router-dom";
import useGetUserInfo from "../hooks/useGetUserInfo";

const Dashboard = () => {
  const { userId } = useAuth();
  const { data: userInfo } = useGetUserInfo(userId!);
  console.log("dashboard", userId);
  return (
    <>
      <div className="row">
        <div className="col-md-4">
          Resumen del equipo del usuario si existe {userInfo?.usuario?.nombre}
          <p>
            <Link to="/manage-team">Configura tu equipo</Link>
          </p>
        </div>
        <div className="col-md-4">Balance de apuestas</div>
        <div className="col-md-4">Liga y Equipos</div>
      </div>
    </>
  );
};

export default Dashboard;
