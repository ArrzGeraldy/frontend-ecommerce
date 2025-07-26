import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import SessionGuard from "./SessionGuard";
const MainLayout = () => {
  return (
    <SessionGuard>
      <Toaster />
      <Outlet />
    </SessionGuard>
  );
};

export default MainLayout;
