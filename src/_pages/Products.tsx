import ProductCard from "@/components/product/ProductCard";
import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";
import PaginationControl from "@/components/shared/PaginationControl";
import SearchInput from "@/components/shared/SearchInput";
import SidebarProductGrid from "@/components/shared/SidebarProductGrid";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/hooks/useCategory";
import { useProductManagement, useProducts } from "@/hooks/useProduct";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import type { CategoryType } from "@/types/response";
import { PanelLeftIcon } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const sortValues = [
  { value: "", label: "All Product" },
  { value: "best_seller", label: "Best Seller" },
  { value: "lowest_price", label: "Lowest Price" },
  { value: "highest_price", label: "Highest Price" },
];

const Products = () => {
  const { filter, handleFilter } = useProductManagement({
    limit: 8,
  });
  const { category } = useParams();
  const { data: products, isLoading: productLoading } = useProducts({
    limit: filter.limit,
    page: filter.page,
    parent: category || "",
    sort: filter.sort,
    search: "",
    category: filter.category,
  });

  const { data: childrens } = useCategories({
    limit: 50,
    ...(category && { type: "children-by-slug", slug: category }),
  });

  const [open, setOpen] = useState(window.innerWidth > 1024);

  return (
    <div className="wrapper w-full flex-1 flex flex-col relative">
      <div className="flex gap-4 w-full flex-1  pt-8 relative">
        <SidebarProductGrid
          className="pe-4 ps-4 lg:ps-0 py-4 lg:py-0 border-e border-input min-h-full lg:bg-background/0"
          open={open}
          setOpen={setOpen}
        >
          <div className="w-full ">
            <h1 className="font-medium">Sort By</h1>
            <div className="mt-4 max-h-[140px]  overflow-y-auto text-muted-foreground space-y-2 text-sm custom-scroll">
              {sortValues.map((s: { value: string; label: string }) => (
                <button
                  onClick={() => {
                    handleFilter("sort", s.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "block hover:text-foreground transition-all",
                    filter.sort === s.value && "text-foreground"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full mt-8">
            <h1 className="font-medium">Categories</h1>
            <div className="mt-4 max-h-[140px]  overflow-y-auto text-muted-foreground space-y-2 text-sm custom-scroll">
              <button
                onClick={() => handleFilter("category", "")}
                className={cn(
                  "block hover:text-foreground transition-all",
                  !filter.category && "text-foreground"
                )}
              >
                All category
              </button>
              {childrens?.data &&
                childrens.data.map((c: CategoryType) => (
                  <button
                    onClick={() => {
                      handleFilter("category", c.id);
                      setOpen(false);
                    }}
                    className={cn(
                      "block hover:text-foreground transition-all",
                      filter.category === c.id && "text-foreground"
                    )}
                  >
                    {c.name}
                  </button>
                ))}
            </div>
          </div>
        </SidebarProductGrid>

        {/* product grid */}
        <div className="flex-1 flex flex-col ">
          <div className="flex flex-col gap-y-4 lg:gap-y-0 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="cursor-pointer lg:hidden"
              >
                <PanelLeftIcon size={20} />
              </button>
              {productLoading ? (
                <Skeleton className="h-4 w-[200px]" />
              ) : (
                <span className="text-primary">
                  Found{" "}
                  <span className="text-foreground">{products.total_data}</span>{" "}
                  items
                </span>
              )}
            </div>
            <SearchInput
              onChange={handleFilter}
              value={filter.search}
              className="w-full"
            />
          </div>

          {/* products */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-8 mt-6 flex-1">
            {productLoading ? (
              <ProductGridSkeleton total={4} />
            ) : products?.data?.length === 0 ? (
              <div className="col-span-full flex justify-center text-center text-sm">
                <div className="h-fit translate-y-1/2">
                  <div className="text-lg font-medium mb-2">
                    Oops, nothing here!
                  </div>
                  <div>We couldn't find any matching products.</div>
                </div>
              </div>
            ) : (
              products.data.map((product: Product) => (
                <ProductCard product={product} key={product.id} />
              ))
            )}
          </div>
          {products?.data?.length > 0 && (
            <div className=" w-full flex justify-between items-center mt-6">
              <p className="text-muted-foreground text-sm w-60">
                Showing page {filter.page} of {products?.total_page}
              </p>
              <PaginationControl
                page={filter.page}
                onChange={handleFilter}
                totalPage={products?.total_page}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
