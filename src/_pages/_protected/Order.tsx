import Spinner from "@/components/shared/Spinner";
import {
  useCreateOrderPayment,
  useOrder,
  useOrderManagement,
} from "@/hooks/useOrder";
import { toRupiah } from "@/lib/utils";
import type { OrderCreatePaymentType, OrderItemType } from "@/types";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect } from "react";

import PaymentMethodList from "@/components/order/PaymentMethodList";
import ShippingInformation from "@/components/order/ShippingInformation";
import CourierList from "@/components/order/CourierList";
import toast from "react-hot-toast";
import ButtonLoader from "@/components/shared/ButtonLoader";
import ProductOrderRow from "@/components/order/ProductOrderRow";
import EmptyData from "@/components/shared/EmptyData";

const Order = () => {
  const { id } = useParams();
  const { data, isLoading } = useOrder(id);

  const { mutateAsync, isPending } = useCreateOrderPayment(id);

  const {
    addressForm,
    selectedAddress,
    selectedBank,
    selectedCourier,
    setSelectedAddress,
    setSelectedBank,
    setSelectedCourier,
    handleAddress,
  } = useOrderManagement();

  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!selectedAddress) {
      toast.error("Please select address");
      return;
    }

    const orderPayReq: OrderCreatePaymentType = {
      address: {
        city: selectedAddress.city,
        phone: selectedAddress.phone,
        postal_code: selectedAddress.postal_code,
        province: selectedAddress.phone,
        recipient_name: selectedAddress.recipient_name,
        ...(selectedAddress.detail && { detail: selectedAddress.detail }),
      },
      bank: selectedBank,
      shipping_courier: selectedCourier,
    };
    const res = await mutateAsync(orderPayReq);
    navigate(`/payment/${res.data.order_id}`);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 w-full flex items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  if (!data?.data) {
    return <EmptyData />;
  }
  return (
    <div className="wrapper w-full flex-1">
      <h1 className=" text-3xl font-semibold mt-4">Checkout</h1>
      <div className="grid lg:grid-cols-2 gap-8 mt-6 pb-8">
        <div className="pe-8 border-e border-ring space-y-4">
          <PaymentMethodList
            selectedBank={selectedBank}
            setSelectedBank={setSelectedBank}
          />

          <ShippingInformation
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            addressForm={addressForm}
            handleAddress={handleAddress}
          />
          <CourierList
            selectedCourier={selectedCourier}
            setSelectedCourier={setSelectedCourier}
          />
        </div>
        <div>
          <div>
            <h2 className="text-lg font-semibold ">Order Summary</h2>
            {data.data.order_items.map((item: OrderItemType, i: number) => (
              <ProductOrderRow key={i} item={item} />
            ))}
          </div>

          <div className="flex justify-between w-full items-center text-sm font-medium mt-4">
            <p className="text-muted-foreground">Subtotal</p>{" "}
            <span className="font-semibold">
              {toRupiah(data.data.base_price)}
            </span>
          </div>
          <div className="flex justify-between w-full items-center text-sm font-medium mt-3">
            <p className="text-muted-foreground">Shipping</p>{" "}
            <span className="font-semibold">
              {selectedCourier ? toRupiah(10000) : "Rp --"}
            </span>
          </div>
          <div className="flex justify-between w-full items-center text-sm font-semibold mt-3">
            <p className="">Total</p>{" "}
            <span>
              {toRupiah(
                selectedCourier
                  ? 10000 + data.data.final_price
                  : data.data.final_price
              )}
            </span>
          </div>

          <ButtonLoader
            className="w-full mt-4"
            disabled={isPending}
            onClick={handlePayment}
          >
            Pay
          </ButtonLoader>
        </div>
      </div>
    </div>
  );
};

export default Order;
