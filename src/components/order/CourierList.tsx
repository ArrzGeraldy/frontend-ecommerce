import { useState, type Dispatch, type SetStateAction } from "react";
import { ChevronRight, ChevronDown, CheckCheck, Truck } from "lucide-react"; // pastikan kamu install `lucide-react`
import { cn } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const courires = ["jne", "jnt", "ninja", "tiki"];

type PaymentListProps = {
  selectedCourier: string;
  setSelectedCourier: Dispatch<SetStateAction<string>>;
};

const CourierList = ({
  selectedCourier,
  setSelectedCourier,
}: PaymentListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="foreground rounded-lg border p-4 border-ring">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-lg font-semibold flex gap-2 items-center">
          {selectedCourier ? (
            <CheckCheck className="opacity-75" />
          ) : (
            <Truck className="opacity-75" />
          )}
          Shipping Courier
        </div>
        {isOpen ? <ChevronDown /> : <ChevronRight />}
      </div>

      <RadioGroup
        onValueChange={(e) => setSelectedCourier(e)}
        className={cn(
          "ease-in duration-100 overflow-hidden",
          isOpen ? "h-fit opacity-100 mt-4" : "h-0 opacity-0"
        )}
        defaultValue={selectedCourier}
      >
        {courires.map((courier, i) => (
          <div key={i} className="flex items-center space-x-2 ">
            <RadioGroupItem
              className="border-foreground"
              value={courier}
              id={courier}
            />
            <Label htmlFor={courier} className="text-base cursor-pointer">
              {courier.toUpperCase()}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default CourierList;
