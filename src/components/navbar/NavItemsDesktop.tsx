import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useCategories } from "@/hooks/useCategory";
import type { CategoryTreeType } from "@/types/response";
import { Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
const NavItemsDesktop = () => {
  const { data, isLoading } = useCategories({ limit: 10, type: "tree" });

  if (isLoading) {
    return Array.from({ length: 4 }).map((_, i) => (
      <Skeleton key={i} className="w-14 h-4 bg-input rounded-md my-2.5" />
    ));
  }
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to={"#"}>New Arrival</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {data?.data &&
          data?.data.map((category: CategoryTreeType) => (
            <NavigationMenuItem key={category.id}>
              <NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid grid-cols-3 w-[400px]">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to={`/products/${category.slug}`}>View All</Link>
                    </NavigationMenuLink>
                  </li>
                  {category.children.map((c) => (
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to={"#"}>{c.name}</Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavItemsDesktop;
