import { Card } from "../../ui/card";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Plus, X } from "lucide-react";
import type { VariantType } from "@/types";
import React from "react";

type VariantFieldsProps = {
  variants: VariantType[];
  onChange: (name: string, value: VariantType[]) => void;
  onRemoveField: (index: number) => void;
};

const VariantFields = React.memo(
  ({ variants, onChange, onRemoveField }: VariantFieldsProps) => {
    const handleAddVariant = () => {
      const newVariants = [...variants, { name: "", price_diff: 0, stock: 0 }];
      onChange("variants", newVariants);
    };

    const handleVariantChange = (
      index: number,
      field: "name" | "price_diff" | "stock",
      value: string
    ) => {
      if (["price_diff", "stock"].includes(field)) {
        const numeric = value.replace(/[^\d]/g, "");
        const newVariants = variants.map((v, i) =>
          i === index ? { ...v, [field]: Number(numeric) } : v
        );
        onChange("variants", newVariants);

        return;
      }
      const newVariants = variants.map((v, i) =>
        i === index ? { ...v, [field]: value } : v
      );
      onChange("variants", newVariants);
    };

    return (
      <Card className="px-4 col-span-8  gap-y-2">
        <h4 className="font-semibold text-lg">Product Variants</h4>
        <div className="grid grid-cols-10 gap-4 mt-4">
          <Label className="text-sm col-span-3">Name</Label>
          <Label className="text-sm col-span-3">Price Difference</Label>
          <Label className="text-sm col-span-3">Stock</Label>
        </div>
        {variants.map((v, i: number) => (
          <div key={i} className="grid grid-cols-10 gap-4 mb-2">
            <Input
              onChange={({ target }) =>
                handleVariantChange(i, "name", target.value)
              }
              value={v.name}
              placeholder="name variant"
              className=" col-span-3"
            />
            <Input
              onChange={({ target }) =>
                handleVariantChange(i, "price_diff", target.value)
              }
              value={v.price_diff}
              placeholder="price difference"
              className=" col-span-3"
            />
            <Input
              onChange={({ target }) =>
                handleVariantChange(i, "stock", target.value)
              }
              value={v.stock}
              placeholder="total stock"
              className=" col-span-3"
            />
            <Button
              disabled={variants.length <= 1}
              onClick={() => onRemoveField(i)}
              type="button"
              className="bg-rose-600 hover:bg-rose-600/80 text-white"
              size={"icon"}
            >
              <X size={14} />
            </Button>
          </div>
        ))}
        <div className="w-full flex justify-center">
          <Button
            onClick={handleAddVariant}
            size={"icon"}
            type="button"
            className="mt-4"
          >
            <Plus />
          </Button>
        </div>
      </Card>
    );
  }
);

export default VariantFields;
