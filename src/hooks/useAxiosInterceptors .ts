import { useEffect } from "react";
import useAuth from "./useAuth";
import { api } from "@/lib/axios";
import { refresh } from "@/lib/auth";
import type { User } from "@/types";
import { jwtDecode } from "jwt-decode";

export const useAxiosInterceptors = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      const token = auth?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newToken = await refresh();
            const decode = jwtDecode<User>(newToken);
            setAuth({
              user: decode,
              accessToken: newToken,
            });

            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          } catch (refreshError) {
            setAuth(undefined);
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, setAuth]);
};
