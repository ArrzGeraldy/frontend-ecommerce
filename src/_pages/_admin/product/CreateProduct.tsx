import VariantFields from "@/components/admin/product/VariantFields";
import ProductCategoryFields from "@/components/admin/product/ProductCategoryFields";
import ProductImageField from "@/components/admin/product/ProductImageField";
import ProductPricingFields from "@/components/admin/product/ProductPricingFields";
import ProductGeneralFields from "@/components/admin/product/ProductGeneralFields";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { buildFormDataProduct } from "@/lib/utils";
import { useCreateProduct, useProductFormManagement } from "@/hooks/useProduct";
import toast from "react-hot-toast";
import ButtonLoader from "@/components/shared/ButtonLoader";
import { useCallback } from "react";

const CreateProduct = () => {
  const {
    form,
    mainCategoryValue,
    setMainCategoryValue,
    resetForm,
    handleChange,
  } = useProductFormManagement();
  const { mutateAsync, isPending } = useCreateProduct();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ form });
    const formData = buildFormDataProduct(form);

    const status = await mutateAsync(formData);
    if (status === 201) {
      toast.success("Success create new product");
      resetForm();
    }
  };

  const handleRemoveVariant = useCallback(
    (index: number) => {
      console.log({ index });
      const newVariants = form.variants.filter((_, i) => i !== index);
      console.log(newVariants);
      handleChange("variants", newVariants);
    },
    [handleChange, form.variants]
  );

  return (
    <div className="p-4">
      <h1 className="text-xl lg:text-2xl font-semibold">Create Product</h1>
      <form
        onSubmit={submit}
        className="grid sm:grid-cols-12 gap-4 mt-4 items-start auto-rows-[min-content]"
      >
        <div className="col-span-8 row-span-3 gap-y-6 flex flex-col">
          <ProductGeneralFields
            description={form.description}
            name={form.name}
            onChange={handleChange}
          />

          {/* category */}
          <ProductCategoryFields
            mainCategoryValue={mainCategoryValue}
            setMainCategoryValue={setMainCategoryValue}
            category_id={form.category_id}
            onChange={handleChange}
          />

          {/* variants */}
          <VariantFields
            onRemoveField={handleRemoveVariant}
            onChange={handleChange}
            variants={form.variants}
          />
          {/* submit button */}
          <div className="flex items-center gap-2">
            {/* <Button>Save</Button> */}
            <ButtonLoader
              type="submit"
              className="w-fit mt-0"
              disabled={isPending}
              loadingText="Save"
            >
              Save
            </ButtonLoader>
            <Link className="" to={"/admin/products"}>
              <Button variant={"secondary"}>Cancel</Button>
            </Link>
          </div>
        </div>

        {/* image */}
        <ProductImageField imageFile={form.image} onChange={handleChange} />

        {/* pricing */}
        <ProductPricingFields
          cost_price={form.cost_price}
          discount={form?.discount || ""}
          price={form.price}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default CreateProduct;
