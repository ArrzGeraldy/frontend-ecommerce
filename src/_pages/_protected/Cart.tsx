import DesktopCartList from "@/components/cart/DesktopCartList";
import MobileCartList from "@/components/cart/MobileCartList";
import DialogDelete from "@/components/DialogDelete";
import EmptyData from "@/components/shared/EmptyData";
import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCartItems, useDeleteCartItem } from "@/hooks/useCart";
import { useCreateOrder } from "@/hooks/useOrder";
import { toRupiah } from "@/lib/utils";
import type { CartItemType, TargetToDeleteType } from "@/types";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { data, isLoading, refetch } = useCartItems();
  const isMobile = useIsMobile();
  const { mutateAsync } = useCreateOrder();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [targetToDelete, setTargetToDelete] = useState<TargetToDeleteType>({
    id: null,
    name: "",
  });
  const handleOpenDialog = (id: number | null, name: string) => {
    setTargetToDelete({ id, name });
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setTargetToDelete({ id: null, name: "" });
    setOpen(false);
  };

  const { mutateAsync: mutateDeleteItem, isPending } = useDeleteCartItem();
  const handleDelete = async () => {
    if (!targetToDelete.id) {
      toast.error("ID to delete is null");
      setOpen(false);
      return;
    }

    const res = await mutateDeleteItem(targetToDelete.id);
    if (res === 200) {
      toast.success("Success delete item from cart");
      setOpen(false);
      refetch();
    }
  };
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

  if (!data?.data || data.data.length < 1) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-semibold mb-2">
          Your bag is empty <ShoppingCart className="inline ms-1" />
        </h2>

        <p className="text-muted-foreground mb-4">
          Looks like you haven't added anything yet.
        </p>
        <Link to={"/products"}>
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="wrapper flex-1 w-full">
      <h1 className="text-2xl font-semibold pt-4 pb-6">Shopping cart</h1>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 items-start pb-24">
        {isMobile ? (
          <MobileCartList
            handleOpenDialog={handleOpenDialog}
            items={data.data}
          />
        ) : (
          <DesktopCartList
            handleOpenDialog={handleOpenDialog}
            items={data.data}
          />
        )}

        <DialogDelete
          open={open}
          handleClose={handleCloseDialog}
          handleDelete={handleDelete}
          loadingDelete={isPending}
          targetToDelete={targetToDelete}
        />

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
