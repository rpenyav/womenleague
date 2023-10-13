import React from "react";
import Layout from "../../layout/Layout";
import { useAuth } from "../../context/AuthContext";
import useGetUserInfo from "../../hooks/useGetUserInfo";
import { Team } from "../../models/team";
import ChooseTeam from "../../components/Owner/ChooseTeam";

const ManageTeam = () => {
  const { userId } = useAuth();
  const { data: userInfo } = useGetUserInfo(userId!);

  return (
    <>
      {userInfo?.usuario?.ownedTeams?.length === 0 ? (
        <>
          Vamos a escoger equipo
          <ChooseTeam />
        </>
      ) : (
        <>
          Estos son tus equipos
          {userInfo?.teams &&
            userInfo.teams.map((team: Team) => (
              <div key={team._id}>{team.team_name}</div>
            ))}
        </>
      )}
    </>
  );
};

export default ManageTeam;
