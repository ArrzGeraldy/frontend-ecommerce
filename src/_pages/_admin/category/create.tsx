import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories, useCreateCategory } from "@/hooks/useCategory";
import type { CategoryType } from "@/types/response";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/shared/ButtonLoader";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

type FormDataType = {
  name: string;
  parent_id: number | null;
};

const CategoryCreate = () => {
  const {
    data: categories,
    isLoading,
    refetch,
  } = useCategories({
    limit: 100,
    type: "parent",
  });

  const [formData, setFromData] = useState<FormDataType>({
    name: "",
    parent_id: null,
  });

  // const navigate = useNavigate();

  const { mutateAsync, isPending } = useCreateCategory();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await mutateAsync(formData);
    if (data) {
      toast.success("Success create category");
      setFromData({
        name: "",
        parent_id: null,
      });
      // navigate("/admin/categories");
      if (!formData.parent_id) {
        refetch();
      }
    }
  };

  return (
    <div className="p-4 w-full">
      <h1 className="text-xl lg:text-2xl font-semibold">Create Category</h1>
      <form onSubmit={submit} className="grid sm:grid-cols-2 mt-4 gap-4">
        <div className="grid gap-y-2">
          <Label>Name</Label>
          <Input
            value={formData.name}
            onChange={(e) =>
              setFromData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="name category"
          />
        </div>

        <div className="grid gap-y-2">
          <Label>Parent</Label>
          <Select
            value={String(formData.parent_id || "")}
            onValueChange={(e) => {
              const value = e === "null" ? null : Number(e);
              setFromData((prev) => ({ ...prev, parent_id: value }));
            }}
          >
            <SelectTrigger className="w-full dark:bg-input/50">
              <SelectValue placeholder="select parent" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Parent</SelectLabel>
                <SelectItem value="null">None</SelectItem>

                {!isLoading &&
                  categories?.data.map((p: CategoryType) => (
                    <SelectItem key={p.id} value={`${p.id}`}>
                      {p.name}
                    </SelectItem>
                  ))}
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
            <Button variant={"secondary"}>Back</Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CategoryCreate;
