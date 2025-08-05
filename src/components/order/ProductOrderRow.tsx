import { toRupiah } from "@/lib/utils";
import type { OrderItemType } from "@/types";

const ProductOrderRow = ({ item }: { item: OrderItemType }) => {
  return (
    <div className="flex gap-4 py-4 border-b border-border-foreground">
      <div className="w-32 h-24 rounded-md overflow-hidden ">
        <img
          src={item.product_variant.product.img_url}
          className="object-cover h-full w-full"
        />
      </div>

      <div className="flex flex-col w-full justify-between">
        <div className="flex flex-col">
          <div className="grid grid-cols-6 items-center justify-between">
            <p className="text-sm font-medium col-span-4 truncate">
              {item.product_variant.product.name}
            </p>
          </div>

          <span className="text-xs  text-accent-foreground">
            Variant: {item.product_variant.name}
          </span>

          <div className="text-sm font-semibold mt-2">
            {toRupiah(item.product_variant.product.price)}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm ">x{item.quantity}</p>
          <div className="text-end font-semibold text-sm col-span-2">
            {toRupiah(item.amount)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOrderRow;
