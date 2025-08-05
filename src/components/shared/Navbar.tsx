import {
  AlignJustify,
  ChevronRight,
  Search,
  ShoppingBag,
  UserRound,
} from "lucide-react";
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
import { useCategories } from "@/hooks/useCategory";
import { Skeleton } from "../ui/skeleton";
import type { BaseCategory, CategoryTreeType } from "@/types/response";
import { useState } from "react";
import { cn } from "@/lib/utils";

import LogoDark from "@/assets/logo/logo-dark.svg";
import LogoLight from "@/assets/logo/logo-light.svg";
import { useTheme } from "@/context/theme-provider";

const Navbar = () => {
  const { data, isLoading } = useCategories({ limit: 10, type: "tree" });
  const { theme } = useTheme();

  const [categoryOpens, setCategoryOpens] = useState<number[]>([]);
  const toogle = (index: number) => {
    setCategoryOpens((prev) =>
      categoryOpens.includes(index)
        ? categoryOpens.filter((p) => p !== index)
        : [...prev, index]
    );
  };

  return (
    <nav className="w-full flex flex-col items-center justify-center">
      <div className="wrapper w-full flex justify-between items-center py-4">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger className="md:hidden">
              <AlignJustify />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="h-full overflow-auto custom-scroll"
            >
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold flex items-center gap-2">
                  <span>Bazario</span>
                </SheetTitle>
                <SheetDescription asChild>
                  <div className="mt-2">
                    <div
                      className={
                        "w-full relative border border-input rounded-lg"
                      }
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
                </SheetDescription>

                <div className="mt-4">
                  {isLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-full" />
                    </div>
                  ) : (
                    data?.data &&
                    data.data.map((category: CategoryTreeType, i: number) => (
                      <div
                        key={category.id}
                        className="border-b border-muted-foreground pb-2 mt-2"
                      >
                        <button
                          onClick={() => toogle(i)}
                          className="flex items-center justify-between w-full "
                        >
                          <span className="font-medium">{category.name}</span>
                          <ChevronRight
                            className={cn(
                              "rotate-0 ease-in duration-200",
                              categoryOpens.includes(i) && "rotate-90"
                            )}
                          />
                        </button>

                        <div
                          className={cn(
                            "flex flex-col space-y-2 text-sm ease-in duration-200 overflow-hidden text-foreground/80",
                            categoryOpens.includes(i)
                              ? "max-h-[400px] opacity-100 mt-2 mb-2"
                              : "max-h-0 opacity-0"
                          )}
                        >
                          <Link to={`/products/${category.slug}`}>
                            View All
                          </Link>
                          {category.children.map((c: BaseCategory) => (
                            <Link
                              key={c.id}
                              className="hover:text-foreground transition-all"
                              to={`/products/${category.slug}?category=${c.id}`}
                            >
                              {c.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Link to={"/"} className="text-2xl font-bold flex items-center gap-1">
            <img
              src={theme === "light" ? LogoDark : LogoLight}
              alt="logo"
              width={22}
              height={22}
            />
            <span>Bazario</span>
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
          <Link to={"/cart"}>
            <ShoppingBag size={20} />
          </Link>
          <ThemeButton />
        </div>
      </div>
      <div className="md:flex hidden items-center justify-center w-full gap-8  py-3 ">
        <NavItemsDesktop categories={data?.data} isLoading={isLoading} />
      </div>
    </nav>
  );
};

export default Navbar;
