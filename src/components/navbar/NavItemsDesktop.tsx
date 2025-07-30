import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import type { CategoryTreeType } from "@/types/response";
import { Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";

type NavItemProps = {
  categories: CategoryTreeType[];
  isLoading: boolean;
};

const NavItemsDesktop = ({ categories, isLoading }: NavItemProps) => {
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
            <a href="#newest">New Arrival</a>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {categories &&
          categories.map((category: CategoryTreeType) => (
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
                    <li key={c.id}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={`/products/${category.slug}?category=${c.id}`}
                        >
                          {c.name}
                        </Link>
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
