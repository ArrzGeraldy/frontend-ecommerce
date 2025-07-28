import { useState, type Dispatch, type SetStateAction } from "react";
import {
  ChevronRight,
  ChevronDown,
  CheckCheck,
  UserRound,
  MapPin,
  Phone,
  PackageSearch,
} from "lucide-react"; // pastikan kamu install `lucide-react`
import { cn } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCreateAddress, useUserAddress } from "@/hooks/useAddress";
import type { AddressCreateType, AddressType } from "@/types";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import toast from "react-hot-toast";
import ButtonLoader from "../shared/ButtonLoader";
import Spinner from "../shared/Spinner";

type ShippingInfoType = {
  handleAddress: (name: string, v: string) => void;
  addressForm: AddressCreateType;
  selectedAddress: AddressType | undefined;
  setSelectedAddress: Dispatch<SetStateAction<AddressType | undefined>>;
};

const ShippingInformation = ({
  handleAddress,
  addressForm,
  selectedAddress,
  setSelectedAddress,
}: ShippingInfoType) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, refetch } = useUserAddress();

  const { mutateAsync, isPending } = useCreateAddress();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      const status = await mutateAsync(addressForm);
      if (status === 201) {
        toast.success("Success create address");
        refetch();
      }
    } finally {
      setDialogOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="foreground rounded-lg border p-4 border-ring">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="foreground rounded-lg border p-4 border-ring">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-lg font-semibold flex gap-2 items-center">
          {selectedAddress ? (
            <CheckCheck className="opacity-75" />
          ) : (
            <PackageSearch className="opacity-75" />
          )}
          Shipping information
        </div>
        {isOpen ? <ChevronDown /> : <ChevronRight />}
      </div>

      {data?.data?.length > 0 ? (
        <RadioGroup
          onValueChange={(e) => setSelectedAddress(JSON.parse(e))}
          className={cn(
            "ease-in duration-100 overflow-hidden",
            isOpen ? "h-fit opacity-100 mt-4" : "h-0 opacity-0"
          )}
        >
          {data.data.map((address: AddressType) => (
            <div key={address.id} className="flex items-center space-x-2">
              <RadioGroupItem
                className="border-foreground"
                value={JSON.stringify(address)}
                id={String(address.id)}
              />
              <div className="bg-muted text-sm px-2 py-2 rounded-lg space-y-2 w-1/2">
                <div className="flex gap-2 items-center">
                  <UserRound className="size-4 opacity-75" />
                  {address.recipient_name}
                </div>
                <div className="flex gap-2 items-center">
                  <MapPin className="size-4 opacity-75" />
                  {address.province}, {address.city}
                </div>
                <div className="flex gap-2 items-center">
                  <Phone className="size-4 opacity-75" />
                  {address.phone}
                </div>
              </div>
            </div>
          ))}

          <Button onClick={() => setDialogOpen(true)}>Create new</Button>
        </RadioGroup>
      ) : (
        <div className="text-center mt-6 p-4 bg-muted  rounded-lg">
          <p className="mb-2 text-muted-foreground">
            You don’t have any saved addresses yet.
          </p>
          <Button onClick={() => setDialogOpen(true)}>Create one</Button>
        </div>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Address</DialogTitle>
            <DialogDescription asChild>
              <div className="py-4 grid grid-cols-2 gap-4">
                <div className="grid space-y-2 col-span-2">
                  <Label className="text-sm">Recipient Name</Label>
                  <Input
                    value={addressForm.recipient_name}
                    onChange={(e) =>
                      handleAddress("recipient_name", e.target.value)
                    }
                    placeholder="john doe"
                  />
                </div>
                <div className="grid space-y-2">
                  <Label className="text-sm">Phone</Label>
                  <Input
                    value={addressForm.phone}
                    onChange={({ target }) =>
                      handleAddress("phone", target.value)
                    }
                    placeholder="088xxxxxx"
                  />
                </div>
                <div className="grid space-y-2">
                  <Label className="text-sm">Province</Label>
                  <Input
                    value={addressForm.province}
                    onChange={({ target }) =>
                      handleAddress("province", target.value)
                    }
                    placeholder="enter your province"
                  />
                </div>
                <div className="grid space-y-2">
                  <Label className="text-sm">City</Label>
                  <Input
                    value={addressForm.city}
                    onChange={({ target }) =>
                      handleAddress("city", target.value)
                    }
                    placeholder="enter your city"
                  />
                </div>

                <div className="grid space-y-2">
                  <Label className="text-sm">Postal Code</Label>
                  <Input
                    value={addressForm.postal_code}
                    onChange={({ target }) =>
                      handleAddress("postal_code", target.value)
                    }
                    placeholder="enter your postal code"
                  />
                </div>
                <div className="grid space-y-2 col-span-2">
                  <Label className="text-sm">Detail</Label>
                  <Textarea
                    value={addressForm.detail}
                    onChange={({ target }) =>
                      handleAddress("detail", target.value)
                    }
                    placeholder="(optional)"
                    className="h-24"
                  ></Textarea>
                </div>
                <div className="col-span-2 w-full flex justify-end mt-2">
                  <ButtonLoader onClick={handleSubmit} disabled={isPending}>
                    Save
                  </ButtonLoader>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShippingInformation;
