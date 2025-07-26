import {
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from "react";
import type { AuthType } from "../types";
import { useAxiosInterceptors } from "../hooks/useAxiosInterceptors ";

interface AuthContextI {
  auth: AuthType | undefined;
  setAuth: Dispatch<SetStateAction<AuthType | undefined>>;
}
export const AuthContext = createContext<AuthContextI>({
  auth: undefined,
  setAuth: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthType | undefined>();

  useAxiosInterceptors();

  useEffect(() => {
    console.log({ auth });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
