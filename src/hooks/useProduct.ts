import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth.js";
import { api, handleAxiosError } from "@/lib/axios.js";
import { useCallback, useEffect, useState } from "react";
import type { FormDataProductType, ProductsQuery } from "@/types/index.js";

export const useProducts = ({
  page = 1,
  limit = 10,
  sort = "",
  search = "",
  parent = "",
  category,
}: ProductsQuery) => {
  const { auth } = useAuth();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products", { page, limit, sort, search, parent, category }],
    queryFn: async () => {
      try {
        const res = await api.get("/products", {
          params: {
            page,
            limit,
            ...(sort && { sort }),
            ...(search && { search }),
            ...(parent && { parent }),
            ...(category && { category }),
          },
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
            "Content-Type": "application/json",
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

export const useCreateProduct = () => {
  const { auth } = useAuth();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await api.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
          "Content-Type": "multipart/form-data",
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

export const useDeleteProdcut = () => {
  const { auth } = useAuth();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (id: string | number) => {
      const res = await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      return res.status;
    },

    onError: (err) => {
      handleAxiosError(err);
    },
  });

  return { mutateAsync, isPending };
};

// management
export const useProductFormManagement = (
  defaultValue?: FormDataProductType
) => {
  const initValue = {
    name: "",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis minima molestiae delectus vel totam voluptates nesciunt omnis ipsum sapiente dolor unde expedita debitis itaque odit neque qui error, rem beatae rerum alias. Laboriosam, qui voluptatibus? Tempora placeat dolores odit ipsum.",
    price: "",
    cost_price: "",
    discount: null,
    category_id: "",
    image: "",
    variants: [
      { name: "S", price_diff: 0, stock: 245 },
      { name: "M", price_diff: 0, stock: 132 },
      { name: "L", price_diff: 0, stock: 99 },
      { name: "XL", price_diff: 5000, stock: 54 },
      // pants
      // { name: "32", price_diff: 0, stock: 185 },
      // { name: "33", price_diff: 0, stock: 132 },
      // { name: "34", price_diff: 0, stock: 79 },
      // { name: "35", price_diff: 0, stock: 53 },
      // { name: "36", price_diff: 0, stock: 54 },
      // { name: "37", price_diff: 0, stock: 44 },
      // { name: "38", price_diff: 0, stock: 86 },
      // { name: "39", price_diff: 0, stock: 54 },
      // { name: "40", price_diff: 0, stock: 54 },
      // { name: "41", price_diff: 10000, stock: 32 },
      // { name: "42", price_diff: 10000, stock: 22 },
      // { name: "43", price_diff: 10000, stock: 13 },
      // { name: "44", price_diff: 10000, stock: 20 },
    ],
  };

  const [form, setForm] = useState<FormDataProductType>(initValue);
  const [mainCategoryValue, setMainCategoryValue] = useState("");

  useEffect(() => {
    if (defaultValue) {
      setForm({
        ...defaultValue,
        price: String(defaultValue.price).replace(/\B(?=(\d{3})+(?!\d))/g, "."),
        cost_price: String(defaultValue.cost_price).replace(
          /\B(?=(\d{3})+(?!\d))/g,
          "."
        ),
        discount: String(defaultValue.discount),
      });
    }
  }, [defaultValue]);

  const resetForm = () => {
    setForm(initValue);
    setMainCategoryValue("");
  };

  const handleChange = useCallback((name: string, value: any) => {
    if (name === "image") {
      const file = value;
      if (file) {
        setForm((prev) => ({ ...prev, image: file }));
      }
    } else if (["price", "cost_price", "discount"].includes(name)) {
      const numeric = value.replace(/[^\d]/g, "");
      const formatted = numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      setForm((prev) => ({ ...prev, [name]: formatted }));
    } else if (name === "variants") {
      setForm((prev) => ({ ...prev, variants: value }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }, []);

  return {
    // state
    form,
    mainCategoryValue,
    // setter
    setForm,
    setMainCategoryValue,

    // handler
    handleChange,
    resetForm,
  };
};

export const useProductManagement = ({
  limit = 10,
}: { limit?: number } = {}) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ProductsQuery>({
    parent: "",
    sort: "",
    page: 1,
    limit,
    search: "",
  });

  // handler
  const handleFilter = (name: string, value: string | number) => {
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  return { setSearch, filter, handleFilter, search };
};
