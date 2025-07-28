import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth.ts";
import { api, handleAxiosError } from "@/lib/axios";
import type { AddressCreateType } from "@/types/index.ts";

export const useUserAddress = () => {
  const { auth } = useAuth();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user address"],
    queryFn: async () => {
      try {
        const res = await api.get(`/users/${auth?.user.id}/address`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        });

        return res.data;
      } catch (error) {
        handleAxiosError(error);
      }
    },
  });
  return { data, isLoading, refetch };
};

export const useCreateAddress = () => {
  const { auth } = useAuth();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["user address"],
    mutationFn: async (values: AddressCreateType) => {
      if (!values.detail) {
        delete values.detail;
      }
      const res = await api.post(`/users/${auth?.user.id}/address`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });

      return res.status;
    },

    onError: (error) => {
      handleAxiosError(error);
    },
  });

  return { mutateAsync, isPending };
};
