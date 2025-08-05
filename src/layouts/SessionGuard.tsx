import { useEffect, useState, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import Loader from "@/components/Loader";
import type { User } from "@/types";
import { refresh } from "@/lib/auth";
import useAuth from "@/hooks/useAuth";

type SessionGuardProps = {
  children: ReactNode;
};

const SessionGuard = ({ children }: SessionGuardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = await refresh();
        const user = jwtDecode<User>(token);
        setAuth({
          user,
          accessToken: token,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyToken() : setIsLoading(false);
  }, []);

  if (isLoading) return <Loader />;

  return <>{children}</>;
};

export default SessionGuard;
