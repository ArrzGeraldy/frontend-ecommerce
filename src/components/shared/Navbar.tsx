import { AlignJustify, Search, ShoppingBag, UserRound } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Input } from "../ui/input";
import ThemeButton from "./ThemeButton";
import NavItemsDesktop from "../navbar/NavItemsDesktop";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full flex flex-col items-center justify-center">
      <div className="wrapper w-full flex justify-between items-center py-4">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger className="md:hidden">
              <AlignJustify />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
                <div>
                  <div
                    className={"w-full relative border border-input rounded-lg"}
                  >
                    <Search
                      size={17}
                      className="text-muted-foreground absolute top-2 left-2"
                    />
                    <Input
                      placeholder={"Search..."}
                      className="text-sm bg-transparent border-none pl-8"
                    />
                  </div>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Link to={"/"} className="text-2xl font-semibold">
            Cartzilla
          </Link>
        </div>

        <div
          className={
            "w-full md:w-1/2 md:block relative hidden rounded-lg bg-card "
          }
        >
          <Input placeholder={"Search..."} className="text-sm bg-transparent" />
          <Search
            size={17}
            className="text-muted-foreground absolute top-2 right-2"
          />
        </div>

        <div className="flex items-center gap-4">
          <UserRound size={20} />
          <ShoppingBag size={20} />
          <ThemeButton />
        </div>
      </div>
      <div className="md:flex hidden items-center justify-center w-full gap-8  py-3 ">
        <NavItemsDesktop />
      </div>
    </nav>
  );
};

export default Navbar;
