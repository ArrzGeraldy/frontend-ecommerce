import { useState, type Dispatch, type SetStateAction } from "react";
import {
  ChevronRight,
  ChevronDown,
  CheckCheck,
  CreditCard,
} from "lucide-react"; // pastikan kamu install `lucide-react`
import { cn } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const banks = [
  { value: "bca", label: "BCA (Bank Central Asia)" },
  { value: "bni", label: "BNI (Bank Negara Indonesia)" },
  { value: "bri", label: "BRI (Bank Rakyat Indonesia)" },
  { value: "cimb", label: "CIMB Niaga" },
];

type PaymentListProps = {
  selectedBank: string;
  setSelectedBank: Dispatch<SetStateAction<string>>;
};

const PaymentMethodList = ({
  selectedBank,
  setSelectedBank,
}: PaymentListProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="foreground rounded-lg border p-4 border-ring ">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-lg font-semibold flex gap-2 items-center">
          {selectedBank ? (
            <CheckCheck className="opacity-75" />
          ) : (
            <CreditCard className="opacity-75" />
          )}
          Payment Method
        </div>
        {isOpen ? <ChevronDown /> : <ChevronRight />}
      </div>

      <RadioGroup
        onValueChange={(e) => setSelectedBank(e)}
        className={cn(
          "ease-in duration-100 overflow-hidden",
          isOpen ? "h-fit opacity-100 mt-4" : "h-0 opacity-0"
        )}
        defaultValue={selectedBank}
      >
        {banks.map((bank, i) => (
          <div key={i} className="flex items-center space-x-2 ">
            <RadioGroupItem
              className="border-foreground"
              value={bank.value}
              id={bank.value}
            />
            <Label htmlFor={bank.value} className="text-base cursor-pointer">
              {bank.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodList;
