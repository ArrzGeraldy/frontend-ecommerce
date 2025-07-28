import ProductFilterCategory from "@/components/product/ProductFilterCategory";
import ProductFilterSort from "@/components/product/ProductFilterSort";
import ProductGrid from "@/components/product/ProductGrid";
import ProductGridHeader from "@/components/product/ProductGridHeader";
import PaginationControl from "@/components/shared/PaginationControl";
import SidebarProductGrid from "@/components/shared/SidebarProductGrid";
import useDebounce from "@/hooks/useDebounce";
import { useProductManagement, useProducts } from "@/hooks/useProduct";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const Products = () => {
  const { filter, handleFilter } = useProductManagement({
    limit: 8,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchParam = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  const handleRemoveParam = (key: string) => {
    searchParams.delete(key);
    setSearchParams(searchParams);
  };

  const { parent } = useParams();

  const debounced = useDebounce(filter.search, 800);
  const { data: products, isLoading: productLoading } = useProducts({
    limit: filter.limit,
    page: filter.page,
    parent: parent || "",
    sort: searchParams.get("sort") || "",
    search: debounced,
    category: Number(searchParams.get("category")) || undefined,
  });

  useEffect(() => {
    handleFilter("page", 1);
  }, [searchParams, debounced]);

  const [open, setOpen] = useState(window.innerWidth > 1024);

  return (
    <div className="wrapper w-full flex-1 flex flex-col relative">
      <div className="flex gap-4 w-full flex-1  pt-8 relative">
        <SidebarProductGrid
          className="pe-4 ps-4 lg:ps-0 py-4 lg:py-0 border-e border-input min-h-full lg:bg-background/0"
          open={open}
          setOpen={setOpen}
        >
          <ProductFilterSort
            handleSearchParam={handleSearchParam}
            handleRemoveParam={handleRemoveParam}
            setOpen={setOpen}
            filterSort={searchParams.get("sort")}
          />

          <ProductFilterCategory
            filterCategory={
              searchParams.get("category")
                ? Number(searchParams.get("category"))
                : undefined
            }
            handleSearchParam={handleSearchParam}
            handleRemoveParam={handleRemoveParam}
            setOpen={setOpen}
            parentCategory={parent}
          />
        </SidebarProductGrid>

        {/* product */}
        <div className="flex-1 flex flex-col ">
          <ProductGridHeader
            handleFilter={handleFilter}
            productLoading={productLoading}
            search={filter.search}
            setOpen={setOpen}
            totalData={products?.total_data}
          />

          <ProductGrid
            productLoading={productLoading}
            products={products?.data}
          />
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
