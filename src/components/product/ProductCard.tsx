import { calculateDiscount, toRupiah } from "@/lib/utils";
import type { Product } from "@/types";
import { Search, ShoppingCartIcon } from "lucide-react";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="group cursor-pointer relative overflow-hidden ">
      {product.discount && (
        <div className="text-xs absolute top-3 left-2 z-10  text-white bg-red-500 font-semibold px-2 py-1 rounded-sm ">
          -{product.discount}%
        </div>
      )}

      <div className="absolute top-2 right-2 z-10">
        <div className="bg-white text-black p-2 rounded-full translate-x-30 group-hover:translate-0 ease-in duration-300 hover:bg-white/90">
          <Search className="size-5" />
        </div>
        <div className="bg-white text-black p-2 rounded-full mt-2 translate-x-30 group-hover:translate-0 ease-in duration-500 hover:bg-white/90">
          <ShoppingCartIcon className="size-5" />
        </div>
      </div>
      <div className="h-64 w-full relative rounded-md overflow-hidden bg-muted ">
        <img
          src={product.img_url}
          className="object-cover h-full w-full group-hover:scale-105 ease-in duration-200"
        />
        <span className="absolute top-0 group-hover:opacity-20 bg-input dark:bg-black opacity-0 w-full h-full ease-in duration-200"></span>
      </div>
      <div className="text-sm mt-2 font-medium w-fit">
        <span>{product.name}</span>
      </div>
      <div className="flex gap-2 items-center mt-1.5">
        <div className="font-semibold">
          {toRupiah(calculateDiscount(product.price, product.discount))}
        </div>
        {product.discount && (
          <div className="text-sm line-through text-muted-foreground">
            {toRupiah(product.price)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
