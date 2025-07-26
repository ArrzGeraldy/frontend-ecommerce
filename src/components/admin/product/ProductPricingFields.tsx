import InputLabel from "@/components/InputLabel";
import { Card } from "@/components/ui/card";

type PricingFieldsProps = {
  cost_price: string;
  price: string;
  discount: string;
  onChange: (name: string, value: string) => void;
};

const ProductPricingFields = ({
  cost_price,
  discount,
  price,
  onChange,
}: PricingFieldsProps) => {
  return (
    <Card className="px-4 col-start-9 row-start-2 col-span-4 row-span-1">
      <h4 className="font-semibold text-lg">Pricing</h4>

      <InputLabel
        value={cost_price}
        onChange={(e) => onChange("cost_price", e.target.value)}
        label="Cost Price"
        placeholder="cost price product"
      />
      <InputLabel
        value={price}
        onChange={(e) => onChange("price", e.target.value)}
        label="Price"
        placeholder="price product"
      />
      <InputLabel
        value={discount}
        onChange={(e) => onChange("discount", e.target.value)}
        label="Discount"
        placeholder="(optional)"
      />
    </Card>
  );
};

export default ProductPricingFields;
