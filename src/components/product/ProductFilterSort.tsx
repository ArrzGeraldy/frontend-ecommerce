import { cn } from "@/lib/utils";
import type { Dispatch, SetStateAction } from "react";

const sortValues = [
  { value: "best_seller", label: "Best Seller" },
  { value: "lowest_price", label: "Lowest Price" },
  { value: "highest_price", label: "Highest Price" },
];

type ProductFilterSortType = {
  filterSort: string | null;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleSearchParam: (key: string, value: string) => void;
  handleRemoveParam: (key: string) => void;
};

const ProductFilterSort = ({
  filterSort,
  handleRemoveParam,
  handleSearchParam,
  setOpen,
}: ProductFilterSortType) => {
  return (
    <div className="w-full ">
      <h1 className="font-medium">Sort By</h1>
      <div className="mt-4 max-h-[140px]  overflow-y-auto text-muted-foreground space-y-2 text-sm custom-scroll">
        <button
          onClick={() => {
            handleRemoveParam("sort");
            setOpen(false);
          }}
          className={cn(
            "block hover:text-foreground transition-all",
            !filterSort && "text-foreground"
          )}
        >
          All Product
        </button>
        {sortValues.map((s: { value: string; label: string }) => (
          <button
            onClick={() => {
              handleSearchParam("sort", s.value);
              setOpen(false);
            }}
            className={cn(
              "block hover:text-foreground transition-all",
              filterSort === s.value && "text-foreground"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductFilterSort;
