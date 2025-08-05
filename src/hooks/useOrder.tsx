import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth.js";
import { api, handleAxiosError } from "@/lib/axios.js";
import type {
  AddressCreateType,
  AddressType,
  OrderCreatePaymentType,
  OrderCreateType,
} from "@/types/index.js";
import toast from "react-hot-toast";
import { useState } from "react";

export const useCreateOrder = () => {
  const { auth } = useAuth();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["orders"],
    mutationFn: async (values: OrderCreateType) => {
      const res = await api.post("/orders", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });

      return res.data;
    },

    onError: (error) => {
      handleAxiosError(error);
    },
  });

  return { mutateAsync, isPending };
};

export const useCreateOrderPayment = (id: string | undefined) => {
  const { auth } = useAuth();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["orders"],
    mutationFn: async (values: OrderCreatePaymentType) => {
      if (!id) {
        toast.error("id order is required");
        return;
      }
      const res = await api.post(`/orders/${id}/payment`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });

      return res.data;
    },

    onError: (error) => {
      handleAxiosError(error);
    },
  });

  return { mutateAsync, isPending };
};

export const useOrder = (id: string | undefined) => {
  const { auth } = useAuth();
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      try {
        const res = await api.get(`/orders/${id}`, {
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
    enabled: !!id,
  });

  return { data, isLoading, refetch, isFetching };
};

// management
export const useOrderManagement = () => {
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<AddressType>();
  const [selectedCourier, setSelectedCourier] = useState("");

  const [addressForm, setAddressForm] = useState<AddressCreateType>({
    city: "",
    detail: "",
    phone: "",
    postal_code: "",
    province: "",
    recipient_name: "",
  });

  const handleAddress = (name: string, value: string) => {
    setAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  return {
    // state
    selectedAddress,
    selectedBank,
    selectedCourier,
    addressForm,

    // setter
    setSelectedAddress,
    setSelectedBank,
    setSelectedCourier,

    // handler
    handleAddress,
  };
};
