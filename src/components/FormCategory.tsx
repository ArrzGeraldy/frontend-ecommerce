import ButtonLoader from "./shared/ButtonLoader";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { CategoryType } from "@/types/response";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { type SetStateAction } from "react";
import type { FormDataCategoryType } from "@/types";

type FormCategoryProps = {
  onSubmit: (e: React.FormEvent) => Promise<void>;
  formData: FormDataCategoryType;
  setFormData: React.Dispatch<SetStateAction<FormDataCategoryType>>;
  categories: CategoryType[];
  isPending: boolean;
};

const FormCategory = ({
  onSubmit,
  formData,
  setFormData,
  categories,
  isPending,
}: FormCategoryProps) => {
  return (
    <form onSubmit={onSubmit} className="grid sm:grid-cols-2 mt-4 gap-4">
      <div className="grid gap-y-2">
        <Label>Name</Label>
        <Input
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="name category"
        />
      </div>

      <div className="grid gap-y-2">
        <Label>Parent</Label>
        <Select
          value={formData.parent_id ? `${formData.parent_id}` : "none"}
          onValueChange={(e) => {
            const value = e === "null" ? null : Number(e);
            setFormData((prev) => ({ ...prev, parent_id: value }));
          }}
        >
          <SelectTrigger className="w-full dark:bg-input/50">
            <SelectValue placeholder="select parent" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Parent</SelectLabel>
              <SelectItem value="none">None</SelectItem>

              {categories.map((p: CategoryType) => (
                <SelectItem key={p.id} value={`${p.id}`}>
                  {p.name}
                </SelectItem>
              ))}
              <SelectItem value="parent">Parent</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <ButtonLoader
          loadingText="Save"
          disabled={isPending}
          className="w-24 mt-0"
        >
          Save
        </ButtonLoader>
        <Link className="" to={"/admin/categories"}>
          <Button variant={"secondary"}>Cancel</Button>
        </Link>
      </div>
    </form>
  );
};

export default FormCategory;
