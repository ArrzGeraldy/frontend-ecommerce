import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const callback = encodeURIComponent(location.pathname + location.search);
  return auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate
      to={`/login?callback=${callback}`}
      state={{ from: location }}
      replace
    />
  );
};

export default ProtectedRoute;
