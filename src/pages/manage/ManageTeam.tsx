import React, { useEffect } from "react";
import Layout from "../../layout/Layout";
import { useAuth } from "../../context/AuthContext";
import useGetUserInfo from "../../hooks/useGetUserInfo";
import { Team } from "../../models/team";
import ChooseTeam from "../../components/Owner/ChooseTeam";

const ManageTeam = () => {
  const { userId } = useAuth();
  const { data: userInfo, refetch } = useGetUserInfo(userId!);
  console.log("manage-team", userId);
  useEffect(() => {
    refetch();
  }, [userInfo]);

  return (
    <>
      {userInfo?.usuario?.ownedTeams?.length === 0 ? (
        <>
          Para poder disputar una liga debes seleccionar un equipo. A
          continuación puedes ver los disponibles y escoger el que más te
          interese.
          <ChooseTeam userId={userId!} refetch={refetch} />
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
