"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

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
import { useCategories } from "@/hooks/useCategory";
import { Skeleton } from "@/components/ui/skeleton";
import type { CategoryType } from "@/types/response";

type ComboBoxProductProps = {
  value: string;
  onChange: (name: string, value: string | number) => void;
};

export function CategoryComboBox({ value, onChange }: ComboBoxProductProps) {
  const [open, setOpen] = React.useState(false);
  const { data: categories, isLoading } = useCategories({
    limit: 50,
    type: "parent",
  });

  if (isLoading) return <Skeleton className="h-8 w-[150px]" />;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="text-sm w-[200px] justify-between"
        >
          <div className="max-w-[180px] truncate">
            {" "}
            {value ? (
              categories?.data?.find(
                (category: CategoryType) => category.slug === value
              )?.name
            ) : (
              <span className="opacity-60">Select by category..</span>
            )}
          </div>
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Category" />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                onSelect={(currentValue) => {
                  onChange(
                    "parent",
                    currentValue === value ? "" : currentValue
                  );
                  setOpen(false);
                }}
                key={"all"}
                value=""
              >
                <CheckIcon
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === "" ? "opacity-100" : "opacity-0"
                  )}
                />
                All Category
              </CommandItem>
              {categories?.data &&
                categories.data.map((category: CategoryType) => (
                  <CommandItem
                    key={category.slug}
                    value={category.slug}
                    onSelect={(currentValue) => {
                      onChange(
                        "parent",
                        currentValue === value ? "" : currentValue
                      );
                      setOpen(false);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === category.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {category.name}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
