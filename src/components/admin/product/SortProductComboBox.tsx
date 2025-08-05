"use client";

import * as React from "react";
import { CheckIcon, FunnelPlus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const sortValues = [
  { value: "", label: "All Products" },
  { value: "best_seller", label: "Best Seller" },
  { value: "lowest_price", label: "Lowest Price" },
  { value: "highest_price", label: "Highest Price" },
];

type ComboBoxProductProps = {
  value: string;
  onChange: (name: string, value: string | number) => void;
  className?: string;
};

export function SortProductComboBox({
  value,
  onChange,
  className,
}: ComboBoxProductProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("text-sm w-[150px] justify-start", className)}
        >
          <FunnelPlus className=" h-4 w-4 shrink-0 opacity-50" />
          {value ? (
            sortValues.find((sort) => sort.value === value)?.label
          ) : (
            <span className="opacity-60">Sort By</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Sort by..." />
          <CommandList>
            <CommandEmpty>No sort found.</CommandEmpty>
            <CommandGroup>
              {sortValues.map((sort) => (
                <CommandItem
                  key={sort.value}
                  value={sort.value}
                  onSelect={(currentValue) => {
                    onChange(
                      "sort",
                      currentValue === value ? "" : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === sort.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {sort.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
