import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

import { Outlet } from "react-router-dom";

const StoreLayout = () => {
  return (
    <>
      <main className="overflow-hidden w-full min-h-screen flex flex-col">
        <Navbar />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default StoreLayout;
