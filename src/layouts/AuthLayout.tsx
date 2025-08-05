import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.accessToken ? (
    <Navigate to={"/"} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default AuthLayout;
