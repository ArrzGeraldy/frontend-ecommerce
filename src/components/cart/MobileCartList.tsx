import { toRupiah } from "@/lib/utils";
import type { CartItemType } from "@/types";
import { Minus, Plus } from "lucide-react";

const MobileCartList = ({ items }: { items: CartItemType[] }) => {
  return (
    <div className="w-full">
      {items.map((cart: CartItemType) => (
        <div
          key={cart.id}
          className="flex w-full gap-2  py-3 border-b border-border-foreground"
        >
          <div className="min-w-28 h-28 ">
            <img
              src={cart.product_variant.product.img_url}
              alt={`product cart ${cart.id}`}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col w-full ">
            <div className="grid grid-cols-6 items-center justify-between">
              <p className="text-sm font-medium col-span-4 truncate">
                {cart.product_variant.product.name}
              </p>
              <div className="text-end font-semibold text-sm col-span-2">
                {toRupiah(cart.amount)}
              </div>
            </div>

            <span className="text-xs  text-accent-foreground">
              Variant: {cart.product_variant.name}
            </span>

            <div className="text-sm font-semibold mt-2">
              {toRupiah(cart.product_variant.product.price)}
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-4 border text-xs border-ring w-fit px-2 py-1.5 rounded-full">
                <button className="opacity-75">
                  <Minus className="size-3" />
                </button>
                <span className="text-center">{cart.quantity}</span>
                <button className="opacity-75">
                  <Plus className="size-3" />
                </button>
              </div>
              <button className="w-fit text-xs font-medium text-red-600 dark:text-red-400">
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileCartList;
