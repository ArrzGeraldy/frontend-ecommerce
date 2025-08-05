import { useCategories } from "@/hooks/useCategory";
import { cn } from "@/lib/utils";
import type { CategoryType } from "@/types/response";
import type { Dispatch, SetStateAction } from "react";

type ProductFilterCategoryType = {
  filterCategory: number | undefined;
  parentCategory: string | undefined;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleSearchParam: (key: string, value: string) => void;
  handleRemoveParam: (key: string) => void;
};

const ProductFilterCategory = ({
  filterCategory,
  handleSearchParam,
  setOpen,
  parentCategory,
  handleRemoveParam,
}: ProductFilterCategoryType) => {
  const { data: childrens } = useCategories({
    limit: 50,
    ...(parentCategory && { type: "children-by-slug", slug: parentCategory }),
  });

  const searchParams = new URLSearchParams(window.location.search);
  console.log(searchParams.get("category"));

  return (
    <div className="w-full mt-8">
      <h1 className="font-medium">Categories</h1>
      <div className="mt-4 max-h-[140px]  overflow-y-auto text-muted-foreground space-y-2 text-sm custom-scroll">
        <button
          onClick={() => handleRemoveParam("category")}
          className={cn(
            "block hover:text-foreground transition-all",
            !filterCategory && "text-foreground"
          )}
        >
          All category
        </button>
        {childrens?.data &&
          childrens.data.map((c: CategoryType) => (
            <button
              key={c.id}
              onClick={() => {
                handleSearchParam("category", `${c.id}`);
                setOpen(false);
              }}
              className={cn(
                "block hover:text-foreground transition-all",
                filterCategory === c.id && "text-foreground"
              )}
            >
              {c.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default ProductFilterCategory;
