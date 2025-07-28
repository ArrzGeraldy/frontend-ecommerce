import { toRupiah } from "@/lib/utils";
import { Card } from "../ui/card";
import type { CartItemType } from "@/types";

const DesktopCartList = ({ items }: { items: CartItemType[] }) => {
  return (
    <Card className="px-4 col-span-8 text-sm lg:text-base">
      <div className="grid grid-cols-10 gap-4">
        <h4 className="font-semibold col-span-4">Product</h4>
        <h4 className="font-semibold col-span-2">Price</h4>
        <h4 className="font-semibold col-span-2 text-center">Quantity</h4>
        <h4 className="font-semibold col-span-2 text-center">Total</h4>
      </div>
      {items.map((cart: CartItemType) => (
        <div
          key={cart.id}
          className="grid grid-cols-10 pb-4 border-b border-border-foreground text-sm lg:text-base"
        >
          <div className="flex gap-4  w-full col-span-4">
            <img
              src={cart.product_variant.product.img_url}
              alt={`product cart ${cart.id}`}
              className="h-24 w-24 object-cover rounded-md"
            />
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-sm font-medium">
                  {cart.product_variant.product.name}
                </p>
                <span className="text-xs text-accent-foreground">
                  Variant: {cart.product_variant.name}
                </span>
              </div>
              <button className="w-fit text-xs font-medium text-red-600 dark:text-red-400">
                Delete
              </button>
            </div>
          </div>
          <div className="col-span-2 self-center font-semibold">
            {toRupiah(cart.product_variant.product.price)}
          </div>
          <div className="col-span-2 w-full self-center text-center  font-semibold">
            <p>{cart.quantity}</p>
          </div>
          <div className="col-span-2 self-center text-center font-semibold">
            {toRupiah(cart.amount)}
          </div>
        </div>
      ))}
    </Card>
  );
};

export default DesktopCartList;
