import { useQuery } from "react-query";
import { Owner } from "../models/owner";
import { axiosInstance } from "../service/axiosInstance";

const fetchUserInfo = async (userId: string): Promise<Owner> => {
  const { data } = await axiosInstance.get(`/usuario/user-teams/${userId}`);
  return data;
};

const useGetUserInfo = (userId: string) => {
  return useQuery(["userInfo", userId], () => fetchUserInfo(userId), {
    enabled: !!userId, // Solo ejecuta la query si el usuario está logueado
  });
};

export default useGetUserInfo;
