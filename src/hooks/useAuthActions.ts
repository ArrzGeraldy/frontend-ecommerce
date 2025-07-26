import { api, handleAxiosError } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: async (values: { email: string; password: string }) => {
      const res = await api.post("/auth/login", values, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return res;
    },
  });

  return { mutateAsync, isPending, isError };
};
export const useSignup = () => {
  const { mutateAsync, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: async (values: {
      username: string;
      email: string;
      password: string;
    }) => {
      const res = await api.post("/auth/register", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    },

    onError: (error) => {
      handleAxiosError(error);
    },
  });

  return { mutateAsync, isPending, isError, isSuccess, error };
};
