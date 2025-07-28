import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth.ts";
import { api, handleAxiosError } from "@/lib/axios.ts";
import type { CartAddType } from "@/types";

export const useCartItems = () => {
  const { auth } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      try {
        const res = await api.get(`/users/${auth?.user.id}/cart`, {
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
  return { data, isLoading };
};
export const useAddCartItem = () => {
  const { auth } = useAuth();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["cart"],
    mutationFn: async (value: CartAddType) => {
      const res = await api.post(`/users/${auth?.user.id}/cart`, value, {
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
