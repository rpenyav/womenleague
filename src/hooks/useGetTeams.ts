import { useQuery } from "react-query";
import { axiosInstance } from "../service/axiosInstance";
import { Team } from "../models/team";

export const useGetTeams = () => {
  const queryKey = "teams";

  const getTeams = async () => {
    try {
      const response = await axiosInstance.get("/teams?limit=99999");
      const teamsData = response.data.teams; // Accede a la propiedad "teams"

      if (Array.isArray(teamsData)) {
        return teamsData;
      } else {
        throw new Error("Data is not an array");
      }
    } catch (error) {
      console.error("An error occurred while fetching teams:", error);
      throw error;
    }
  };

  const { data, isLoading, isError } = useQuery<Team[]>(queryKey, getTeams);

  return { data, isLoading, isError };
};
