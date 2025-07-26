import { cn } from "@/lib/utils";
import React, {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

const SidebarProductGrid = ({
  open,
  setOpen,
  children,
  className = "",
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  className?: string;
}) => {
  const [isSizeMobile, setIsSizeMobile] = useState(window.innerWidth < 1024);
  const overlayMobile = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = () => {
      setIsSizeMobile(window.innerWidth < 1024);
      setOpen(window.innerWidth < 1024);
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
        // setOpen(true);
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
    <>
      {/* overlay mobile */}
      <div
        ref={overlayMobile}
        onClick={() => {
          if (isSizeMobile) {
            setOpen(false);
          }
        }}
        className="fixed top-0 bg-black/50 h-screen w-full lg:hidden z-20"
      ></div>
      <aside
        className={cn(
          "w-64 min-h-full bg-background left-0 fixed lg:translate-x-0 lg:relative top-0 duration-200 ease-in z-30",
          open ? "translate-x-0" : "-translate-x-full ",
          className
        )}
      >
        {children}
      </aside>
    </>
  );
};

export default SidebarProductGrid;
