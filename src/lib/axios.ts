// @lib/axios.ts
import type { APIErrorResponse } from "@/types";
import axios from "axios";
import { toast } from "react-hot-toast";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const handleAxiosError = (
  error: unknown,
  fallback = "Something went wrong"
) => {
  console.error(error);
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as APIErrorResponse;
    console.log(data);

    toast.error(data?.errors || fallback);
    return;
  }

  toast.error(fallback);
  return;
};
