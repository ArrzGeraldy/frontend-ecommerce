import FormCategory from "@/components/FormCategory";
import {
  useCategories,
  useCategory,
  usePutCategory,
} from "@/hooks/useCategory";
import type { FormDataCategoryType } from "@/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const CategoryEdit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState<FormDataCategoryType>({
    name: "",
    parent_id: null,
  });
  const { data: parents } = useCategories({
    limit: 100,
    type: "parent",
  });

  const {
    data: category,
    isLoading: fetchSingleLoading,
    error,
  } = useCategory(id || "");

  useEffect(() => {
    console.log(error?.message);
  });

  const { mutateAsync, isPending } = usePutCategory(id || "");
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await mutateAsync(formData);
    if (data.data) {
      toast.success("Success edit category");
      navigate("/admin/categories");
    }
  };

  useEffect(() => {
    if (category?.data && !fetchSingleLoading) {
      setFormData({
        name: category.data.name,
        parent_id: category.data.parent_id,
      });
    }
  }, [category]);

  if (error) return <div className="p-4 text-red-400">{error.message}</div>;

  return (
    <div className="p-4 w-full">
      <h1 className="text-xl lg:text-2xl font-semibold">Edit Category</h1>
      {parents?.data && (
        <FormCategory
          categories={parents.data}
          formData={formData}
          isPending={isPending}
          onSubmit={submit}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};

export default CategoryEdit;
