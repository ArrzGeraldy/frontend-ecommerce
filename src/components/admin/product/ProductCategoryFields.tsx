import { Card } from "../../ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useCategories } from "@/hooks/useCategory";
import React, { useState, type Dispatch, type SetStateAction } from "react";
import type { CategoryTreeType, CategoryType } from "@/types/response";
import Spinner from "../../shared/Spinner";

type CategoryFieldsProps = {
  onChange: (name: string, value: any) => void;
  category_id: string;
  mainCategoryValue: string;
  setMainCategoryValue: Dispatch<SetStateAction<string>>;
};

const ProductCategoryFields = React.memo(
  ({
    onChange,
    category_id,
    mainCategoryValue,
    setMainCategoryValue,
  }: CategoryFieldsProps) => {
    const { data: categories, isLoading } = useCategories({
      limit: 50,
      type: "tree",
    });

    const [subCategories, setSubCategories] = useState<CategoryType[]>([]);

    if (isLoading) {
      return (
        <div className="px-4 col-start-9 row-start-3 col-span-4 row-span-1 flex  justify-center">
          <Spinner className="w-8 h-8" />
        </div>
      );
    }
    return (
      <Card className="px-4 grid grid-cols-2 col-start-9 row-start-3 col-span-4 row-span-1">
        <h4 className="font-semibold text-lg col-span-2">Category</h4>

        <div className="grid gap-y-2">
          <Label className="text-sm">Main Category</Label>

          <Select
            value={mainCategoryValue}
            onValueChange={(e) => {
              setMainCategoryValue(e);
              setSubCategories(JSON.parse(e));
              // setMainCategory();
              onChange("category_id", "");
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="select main category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Main Category</SelectLabel>
                {categories?.data &&
                  categories.data.map((category: CategoryTreeType) => (
                    <SelectItem
                      key={category.id}
                      value={JSON.stringify(category.children)}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-y-2">
          <Label className="text-sm">Sub Category</Label>
          <Select
            value={category_id}
            onValueChange={(e) => onChange("category_id", e)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="select sub category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sub Category</SelectLabel>
                {subCategories.length > 0 &&
                  subCategories.map((c) => (
                    <SelectItem key={c.id} value={`${c.id}`}>
                      {c.name}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </Card>
    );
  }
);

export default ProductCategoryFields;
