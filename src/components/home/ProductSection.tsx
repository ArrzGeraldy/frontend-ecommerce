import type { Product } from "@/types";
import ProductGridSkeleton from "../product/ProductGridSkeleton";
import ProductCard from "../product/ProductCard";
import ProductBanner from "../ProductBanner";
import { useProductManagement, useProducts } from "@/hooks/useProduct";
import { cn } from "@/lib/utils";

const sortValues = [
  { value: "", label: "New Arrival" },
  { value: "best_seller", label: "Best Seller" },
  { value: "lowest_price", label: "Lowest Price" },
  { value: "highest_price", label: "Highest Price" },
];

const ProductSection = () => {
  const { filter, handleFilter } = useProductManagement({ limit: 8 });
  const { data, isLoading } = useProducts({
    limit: filter.limit,
    page: filter.page,
    sort: filter.sort,
    parent: filter.parent,
    search: filter.search,
  });
  return (
    <section id="newest" className="pt-24 w-full wrapper">
      <h1 className="text-center text-2xl lg:text-4xl font-semibold">
        This week's highlights
      </h1>

      <div className="flex  gap-4 overflow-auto whitespace-nowrap py-4">
        {sortValues.map((sort) => (
          <button
            key={sort.label}
            onClick={() => handleFilter("sort", sort.value)}
            className={cn(
              "border border-input px-4 py-2 rounded-full text-sm hover:border-primary font-medium ease-in duration-100",
              filter.sort === sort.value && " border-primary"
            )}
          >
            {sort.label}
          </button>
        ))}
      </div>

      {/* products list */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-8 mt-6">
        {/* card */}
        {isLoading ? (
          <ProductGridSkeleton total={4} />
        ) : (
          data?.data &&
          data?.data.map((product: Product, i: number) => (
            <ProductCard product={product} key={i} />
          ))
        )}
      </div>

      {/* banner */}
      <ProductBanner />
    </section>
  );
};

export default ProductSection;
