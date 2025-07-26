import { api, handleAxiosError } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { useCallback, useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import type { TargetToDeleteType } from "@/types";

export const useCategories = ({
  page = 1,
  limit = 10,
  type = "",
  search = "",
  slug = "",
}) => {
  const { data, isLoading, refetch, error, isFetching } = useQuery({
    queryKey: ["categories", { page, type, search, limit }],
    queryFn: async () => {
      try {
        const res = await api.get("/categories", {
          params: {
            page,
            limit,
            ...(type && { type }),
            ...(search && { search }),
            ...(slug && { slug }),
          },
          headers: { "Content-Type": "application/json" },
        });

        return res.data;
      } catch (error) {
        handleAxiosError(error);
      }
    },
  });

  return { data, isLoading, refetch, error, isFetching };
};

export const useCategory = (id: string | number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories", id],
    queryFn: async () => {
      try {
        const res = await api.get(`/categories/${id}`, {
          headers: { "Content-Type": "application/json" },
        });

        return res.data;
      } catch (error) {
        handleAxiosError(error);
      }
    },
  });

  return { data, isLoading, error };
};

export const useCreateCategory = () => {
  const { auth } = useAuth();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: { name: string; parent_id: number | null }) => {
      const res = await api.post("/categories", values, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      return res.data;
    },

    onError: (error) => {
      handleAxiosError(error);
      return;
    },
  });

  return { mutateAsync, isPending };
};

export const usePutCategory = (id: string | number) => {
  const { auth } = useAuth();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: { name: string; parent_id: number | null }) => {
      const res = await api.put(`/categories/${id}`, values, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      return res.data;
    },

    onError: (error) => {
      handleAxiosError(error);
      return;
    },
  });

  return { mutateAsync, isPending };
};

export const useDeleteCategory = () => {
  const { auth } = useAuth();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (id: string | number) => {
      const res = await api.delete(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });

      return res.status;
    },
    onError: (error) => {
      handleAxiosError(error);
      return;
    },
  });

  return { mutateAsync, isPending };
};

export const useCategoryManagement = () => {
  const [filter, setFilter] = useState({
    page: 1,
  });
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [targetToDelete, setTargetToDelete] = useState<TargetToDeleteType>({
    id: null,
    name: "",
  });
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const debouncedSearch = useDebounce(search, 800);

  useEffect(() => {
    setFilter((prev) => ({ ...prev, page: 1 }));
  }, [type, debouncedSearch]);

  const handleFilter = useCallback((name: string, value: number | string) => {
    setFilter((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    setTargetToDelete({ id: null, name: "" });
    setOpenDialogDelete(false);
  }, []);

  const handleOpenDeleteDialog = useCallback((id: number, name: string) => {
    setTargetToDelete({ id, name });
    setOpenDialogDelete(true);
  }, []);

  return {
    // state
    filter,
    search,
    debouncedSearch,
    type,
    targetToDelete,
    openDialogDelete,

    // setter

    setSearch,
    setType,
    setOpenDialogDelete,
    setTargetToDelete,

    // handler
    handleFilter,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
  };
};
