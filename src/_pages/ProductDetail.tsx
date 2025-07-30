import ButtonLoader from "@/components/shared/ButtonLoader";
import Spinner from "@/components/shared/Spinner";
import useAuth from "@/hooks/useAuth";
import { useAddCartItem } from "@/hooks/useCart";
import { useProduct } from "@/hooks/useProduct";
import { calculateDiscount, cn, toRupiah } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id);
  const [quantity, setQuantity] = useState(1);
  const [variantSelect, setVariantSelect] = useState<number>();
  const [stock, setStock] = useState<number>();
  const { mutateAsync, isPending } = useAddCartItem();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const handleAddCartItem = async () => {
    if (!auth?.accessToken) {
      navigate("/login");
      return;
    }
    if (!variantSelect) {
      toast.error("Please select the variant");
      return;
    }

    const status = await mutateAsync({
      product_variant_id: variantSelect,
      quantity,
    });

    if (status === 201) {
      toast.success("Success add to bag");
    }
  };

  useEffect(() => {
    if (product) {
      let temp = 0;
      for (const variant of product.product_variants) {
        temp += variant.stock;
      }

      setStock(temp);
    }
  }, [product]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 w-full flex items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="wrapper flex-1 w-full  ">
      <div className="py-6 grid  lg:grid-cols-11 gap-6 w-full">
        <div className="rounded-md overflow-hidden col-span-6 h-[85%]">
          <img src={product.img_url} className="w-full h-full object-cover" />
        </div>

        <div className="col-span-5 px-4">
          <h1 className="text-2xl font-medium pt-4">{product.name}</h1>

          <div className="mt-4  ">
            <p className="mt-4">{product.description}</p>
          </div>

          <div className="flex gap-2 items-center mt-6">
            <div className="font-medium text-2xl">
              {toRupiah(calculateDiscount(product.price, product.discount))}
            </div>
            {product.discount && (
              <div className="text-sm line-through text-muted-foreground">
                {toRupiah(product.price)}
              </div>
            )}
          </div>

          <div className="mt-6 w-fit">
            <p className="text-sm">Stock: {stock}</p>
            <div className="grid grid-cols-5 gap-4 mt-4">
              {product.product_variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setVariantSelect(v.id);
                    setStock(v.stock);
                  }}
                  className={cn(
                    "border px-4 py-2 border-ring ease-in duration-150",
                    v.id === variantSelect && "bg-foreground text-background"
                  )}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4 ">
            <div className="flex gap-4 border border-ring w-fit px-4 py-2 rounded-full">
              <button
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                className="opacity-75"
              >
                <Minus className="size-5" />
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button
                onClick={() =>
                  setQuantity((prev) => Math.min(stock || 1, prev + 1))
                }
                className="opacity-75"
              >
                <Plus className="size-5" />
              </button>
            </div>
            <ButtonLoader
              disabled={isPending}
              onClick={handleAddCartItem}
              loadingText="Add to bag"
              className="shrink rounded-full mt-0 py-5"
            >
              Add to bag
            </ButtonLoader>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
