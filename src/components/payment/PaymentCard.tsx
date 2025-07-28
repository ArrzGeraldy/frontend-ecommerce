import { toRupiah } from "@/lib/utils";
import ButtonLoader from "../shared/ButtonLoader";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import type { PaymentType } from "@/types";

type PaymentCardInfoProps = {
  payment: PaymentType;
  isFetching: boolean;
  refetch: () => void;
  final_price: number;
};

const PaymentCardInfo = ({
  payment,
  final_price,
  isFetching,
  refetch,
}: PaymentCardInfoProps) => {
  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value).then(() => toast.success("Copied"));
  };

  return (
    <div className="shadow-md px-4 py-4 w-md rounded-lg border space-y-3">
      <div className="flex bg-muted flex-col items-center rounded-lg py-4">
        <div className="text-xs font-semibold bg-foreground text-background px-5 py-1 rounded-full">
          {payment.bank.toUpperCase()}
        </div>
        <p className="text-xl font-semibold mt-2">{payment.va_number}</p>
        <Button
          onClick={() => handleCopy(payment.va_number)}
          size={"sm"}
          className="text-xs mt-2"
        >
          Copy
        </Button>
      </div>
      <p className="text-2xl font-semibold text-center mt-2">
        {toRupiah(final_price)}
      </p>

      <div className="space-y-1 text-sm mt-2">
        <p className="font-semibold">Payment Instructions:</p>
        <ol className="list-decimal list-inside space-y-0.5">
          <li>Open your banking app.</li>
          <li>
            Transfer to <strong>{payment.bank.toUpperCase()}</strong>
          </li>
          <li>
            Send <strong> {toRupiah(final_price)}</strong>.
          </li>
          <li>Double-check the recipient’s name and amount.</li>
          <li>Confirm and complete the payment.</li>
        </ol>
      </div>
      <ButtonLoader
        loadingText="Refresh"
        disabled={isFetching}
        onClick={() => {
          refetch();
          toast(`${payment.status}`, {
            icon: "ℹ️",
          });
        }}
        className="mt-2"
      >
        Refresh
      </ButtonLoader>
    </div>
  );
};

export default PaymentCardInfo;
