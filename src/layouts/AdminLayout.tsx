import { Outlet, useLocation } from "react-router-dom";
import AdminGuard from "./AdminGuard";
import LogoDark from "@/assets/logo/logo-dark.png";
import { Box, LayoutGrid, Search, Settings, Tags } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { PanelLeftIcon } from "lucide-react";
import ThemeButton from "@/components/shared/ThemeButton";
import { useEffect, useRef, useState } from "react";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutGrid,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: Tags,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: Box,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const AdminLayout = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(window.innerWidth > 1024);
  const [isSizeMobile, setIsSizeMobile] = useState(window.innerWidth < 1024);
  const overlayMobile = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = () => {
      setIsSizeMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", isMobile);
    return () => {
      window.removeEventListener("resize", isMobile);
    };
  }, []);

  useEffect(() => {
    const lockScroll = () => {
      const isMobile = window.innerWidth < 1024;

      if (open && isMobile) {
        document.body.classList.add("overflow-hidden");
        overlayMobile.current?.classList.remove("hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
        overlayMobile.current?.classList.add("hidden");
      }
    };

    lockScroll();

    window.addEventListener("resize", lockScroll);

    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("resize", lockScroll);
    };
  }, [open]);
  return (
    <AdminGuard>
      <div className="w-full bg-background min-h-screen flex relative">
        {/* overlay mobile */}
        <div
          ref={overlayMobile}
          onClick={() => {
            if (isSizeMobile) {
              setOpen(false);
            }
          }}
          className="fixed top-0 bg-black/50 h-screen w-full lg:hidden z-10"
        ></div>
        <aside
          className={cn(
            "bg-sidebar w-64 h-screen text-sidebar-foreground border-r-sidebar-border shadow-sm py-4 fixed top-0 duration-200 ease-in z-20",
            open ? "lg:translate-x-0" : "-translate-x-full lg:-translate-x-64"
          )}
        >
          <div className="flex gap-2 items-center  px-4">
            <img src={LogoDark} width={25} />
            <h1 className="text-xl font-semibold">Acmec Inc.</h1>
          </div>

          <div className="flex flex-col gap-3 mt-4 px-2">
            {items.map((v) => (
              <Link
                key={v.title}
                onClick={() => {
                  if (isSizeMobile) {
                    setOpen(false);
                  }
                }}
                to={v.url}
                className={cn(
                  "flex gap-2 items-center px-2 rounded-md py-2 transition-all text-sm font-medium",
                  pathname === v.url
                    ? "bg-primary text-sidebar"
                    : " hover:bg-sidebar-accent hover:text-sidebar-accent-foreground "
                )}
              >
                <v.icon size={20} />
                <span>{v.title}</span>
              </Link>
            ))}
          </div>
        </aside>

        <main
          className={cn(
            "flex-grow duration-200 ease-in flex flex-col",
            open ? "lg:ms-64" : "lg:ms-0"
          )}
        >
          <nav className="w-full flex items-center justify-between p-4 border">
            <div className="flex items-center gap-x-3">
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="cursor-pointer "
              >
                <PanelLeftIcon size={20} />
              </button>
              <span className="h-4 w-[1px] bg-muted-foreground"></span>
              <p className="font-medium">Dashboard</p>
            </div>
            <div className="flex items-center gap-2">
              <ThemeButton />
            </div>
          </nav>
          <div className="h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </AdminGuard>
  );
};

export default AdminLayout;
