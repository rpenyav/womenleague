import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "react-query";
import { AxiosError } from "axios";
import { axiosInstance } from "../service/axiosInstance";
import { Usuario } from "../models/usuario";
import Swal from "sweetalert2";

const updateOwned = async (userId: string, body: any): Promise<Usuario> => {
  const { data } = await axiosInstance.put<Usuario>(`/usuario/${userId}`, body);
  return data;
};

export const useUpdateOwned = (
  options?: UseMutationOptions<
    Usuario,
    AxiosError,
    { userId: string; body: any }
  >
): UseMutationResult<Usuario, AxiosError, { userId: string; body: any }> => {
  const extendedOptions: UseMutationOptions<
    Usuario,
    AxiosError,
    { userId: string; body: any }
  > = {
    ...options,
    onSuccess: (...args) => {
      Swal.fire("¡Éxito!", "Has escogido este equipo", "success");
      options?.onSuccess?.(...args);
    },
    onError: (error, ...args) => {
      console.log("Error al actualizar usuario:", error);
      options?.onError?.(error, ...args);
    },
  };

  return useMutation(
    "updateOwned",
    ({ userId, body }) => updateOwned(userId, body),
    extendedOptions
  );
};
