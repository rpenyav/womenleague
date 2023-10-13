import { useQuery } from "react-query";
import { axiosInstance } from "../service/axiosInstance";
import { Team } from "../models/team";

export const useGetTeamById = (teamId: string, options?: any) => {
  // Definimos la clave única para esta consulta basada en el ID del equipo
  const queryKey = ["team", teamId];

  // En useGetTeamById
  const getTeamById = async () => {
    const response = await axiosInstance.get(`/teams/players/${teamId}`);
    return response.data.team; // Actualizado de response.data.teams a response.data.team
  };

  // Utilizamos useQuery para realizar la consulta
  const { data, isLoading, isError } = useQuery<Team>(
    queryKey,
    getTeamById,
    options
  );

  return { data, isLoading, isError };
};
