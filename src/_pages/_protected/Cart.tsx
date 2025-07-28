import DesktopCartList from "@/components/cart/DesktopCartList";
import MobileCartList from "@/components/cart/MobileCartList";
import EmptyData from "@/components/shared/EmptyData";
import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCartItems } from "@/hooks/useCart";
import { useCreateOrder } from "@/hooks/useOrder";
import { toRupiah } from "@/lib/utils";
import type { CartItemType } from "@/types";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { data, isLoading } = useCartItems();
  const isMobile = useIsMobile();
  const { mutateAsync } = useCreateOrder();
  const navigate = useNavigate();

  const calculateTotal = () => {
    if (data?.data?.length > 0) {
      const cal = data.data.reduce(
        (sum: number, item: CartItemType) => sum + item.amount,
        0
      );
      return cal;
    }

    return 0;
  };

  const handleChekout = async () => {
    if (data?.data.length > 0) {
      const res = await mutateAsync({
        items: data.data.map((item: CartItemType) => {
          return {
            product_variant_id: item.product_variant_id,
            quantity: item.quantity,
          };
        }),
      });

      if (res) {
        navigate(`/order/${res.data.id}`);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 w-full flex items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  if (data?.data.length < 1) {
    return <EmptyData />;
  }
  return (
    <div className="wrapper flex-1 w-full">
      <h1 className="text-2xl font-semibold pt-4 pb-6">
        Shopping cart {"(10)"}
      </h1>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 items-start pb-24">
        {isMobile ? (
          <MobileCartList items={data.data} />
        ) : (
          <DesktopCartList items={data.data} />
        )}

        <Card className="col-span-4 px-4 bg-muted w-full">
          <h1 className="text-xl font-semibold pb-3 border-b border-muted-foreground">
            Order Summary
          </h1>

          <div className="flex items-center justify-between">
            <p className="font-semibold">Cart Total</p>
            <span className="font-semibold">{toRupiah(calculateTotal())}</span>
          </div>
          <Button onClick={handleChekout}>Checkout</Button>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
