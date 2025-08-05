import PaymentCardInfo from "@/components/payment/PaymentCard";
import SuccessPayment from "@/components/payment/SuccessPayment";
import EmptyData from "@/components/shared/EmptyData";
import Spinner from "@/components/shared/Spinner";
import { useOrder } from "@/hooks/useOrder";
import { useEffect } from "react";

import { useParams } from "react-router-dom";

const Payment = () => {
  const { id } = useParams();
  const { data, isLoading, refetch, isFetching } = useOrder(id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading || isFetching) {
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
    <div className="wrapper w-full flex-1 flex items-center justify-center ">
      {data?.data?.payment?.status === "settlement" ? (
        <SuccessPayment orderId={data.data.order_id} />
      ) : (
        <PaymentCardInfo
          final_price={data.data.final_price}
          isFetching={isFetching}
          payment={data.data.payment}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Payment;
