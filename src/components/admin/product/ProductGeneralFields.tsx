import InputLabel from "@/components/InputLabel";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type GeneralFiledsProps = {
  name: string;
  description: string;
  onChange: (name: string, value: string) => void;
};
const ProductGeneralFields = ({
  name,
  description,
  onChange,
}: GeneralFiledsProps) => {
  return (
    <Card className="px-4 ">
      <h4 className="font-semibold text-lg">General Infromation</h4>

      <InputLabel
        name="name"
        value={name}
        label="Product Name"
        onChange={(e) => onChange("name", e.target.value)}
        placeholder="product name"
      />
      <div className="grid gap-y-2">
        <Label className="text-sm">Description</Label>
        <Textarea
          name="description"
          value={description}
          onChange={(e) => onChange("description", e.target.value)}
          className="h-32"
          placeholder="description product"
        ></Textarea>
      </div>
    </Card>
  );
};

export default ProductGeneralFields;
