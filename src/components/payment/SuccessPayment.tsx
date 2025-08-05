import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const SuccessPayment = ({ orderId }: { orderId: String }) => {
  return (
    <div className="flex flex-col items-center gap-2  w-full flex-1 max-w-md  ">
      <div className="bg-green-800/75 text-white rounded-full p-2 w-fit">
        <Check className="size-11 " />
      </div>
      <h1 className="text-3xl font-semibold mt-2">
        Thank you for your purchase
      </h1>
      <p>We've received your order will ship in 5-7 days.</p>
      <p>Your order id is #{orderId}</p>

      <Link
        to={"/"}
        className="bg-primary block mt-2   text-primary-foreground px-4 py-2 rounded-md text-sm font-medium"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default SuccessPayment;
