import React, { useEffect, useState } from "react";
import { useGetTeams } from "../../hooks/useGetTeams";
import { useGetTeamById } from "../../hooks/useGetTeamById";
import TeamDetail from "../Team/TeamDetail";

const ChooseTeam = () => {
  const { data: teams, isLoading, isError } = useGetTeams();
  const [selectedTeamId, setSelectedTeamId] = useState("");

  const handleGetDetail = (e: any) => {
    const selectedId = e.target.value;
    setSelectedTeamId(selectedId);
  };

  const {
    data,
    isLoading: isLoadingDetail,
    isError: isErrorDetail,
  } = useGetTeamById(selectedTeamId, {
    enabled: !!selectedTeamId,
  });

  if (isLoading) {
    return <p>Cargando equipos...</p>;
  }

  if (isError) {
    return <p>{isError}</p>;
  }

  return (
    teams && (
      <div className="row">
        <div className="col-md-3">
          <h2>Selecciona un equipo</h2>
          {isLoading ? (
            <p>Cargando equipos...</p>
          ) : isError ? (
            <p>Error al cargar equipos</p>
          ) : (
            <select
              className="form-select"
              onChange={handleGetDetail}
              value={selectedTeamId || ""}
            >
              <option value="">Selecciona un equipo</option>
              {teams.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.team_name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="col-md-9">
          {isLoadingDetail ? (
            <p>Cargando detalles del equipo...</p>
          ) : isErrorDetail ? (
            <p>Error al cargar los detalles del equipo: {isErrorDetail}</p>
          ) : selectedTeamId ? (
            <>
              <h2>Detalle del equipo seleccionado: {data?.formal_name}</h2>
              <TeamDetail data={data!} />
            </>
          ) : (
            <p>Selecciona un equipo para ver el detalle.</p>
          )}
        </div>
      </div>
    )
  );
};

export default ChooseTeam;
