import type { Product } from "@/types";
import ProductCard from "./ProductCard";
import ProductGridSkeleton from "./ProductGridSkeleton";

type ProductGridType = {
  products: Product[] | undefined;
  productLoading: boolean;
};
const ProductGrid = ({ products, productLoading }: ProductGridType) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-8 mt-6 flex-1">
      {productLoading ? (
        <ProductGridSkeleton total={4} />
      ) : products?.length === 0 ? (
        <div className="col-span-full flex justify-center text-center text-sm">
          <div className="h-fit translate-y-1/2">
            <div className="text-lg font-medium mb-2">Oops, nothing here!</div>
            <div>We couldn't find any matching products.</div>
          </div>
        </div>
      ) : (
        products?.map((product: Product) => (
          <ProductCard product={product} key={product.id} />
        ))
      )}
    </div>
  );
};

export default ProductGrid;
