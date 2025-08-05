import { PanelLeftIcon } from "lucide-react";
import SearchInput from "../shared/SearchInput";
import { Skeleton } from "../ui/skeleton";
import type { Dispatch, SetStateAction } from "react";

type ProductGridHeaderType = {
  search: string;
  totalData: number | undefined;
  productLoading: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleFilter: (name: string, value: string | number) => void;
};

const ProductGridHeader = ({
  search,
  totalData,
  productLoading,
  handleFilter,
  setOpen,
}: ProductGridHeaderType) => {
  return (
    <div className="flex flex-col gap-y-4 lg:gap-y-0 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="cursor-pointer lg:hidden"
        >
          <PanelLeftIcon size={20} />
        </button>
        {productLoading ? (
          <Skeleton className="h-4 w-[200px]" />
        ) : (
          <span className="text-primary">
            Found <span className="text-foreground">{totalData}</span> items
          </span>
        )}
      </div>
      <SearchInput onChange={handleFilter} value={search} className="w-full" />
    </div>
  );
};

export default ProductGridHeader;
