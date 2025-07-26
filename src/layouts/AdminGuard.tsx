import useAuth from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const isAdmin = auth?.user?.role === "admin";

  return isAdmin ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default AdminGuard;
