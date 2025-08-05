import type { FormDataProductType } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const buildFormDataProduct = (form: FormDataProductType): FormData => {
  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("description", form.description);
  formData.append("cost_price", form.cost_price.replaceAll(".", ""));
  formData.append("price", form.price.replaceAll(".", ""));
  if (form.discount) {
    formData.append("discount", form.discount.replaceAll(".", ""));
  }
  formData.append("category_id", form.category_id);
  formData.append("variants", JSON.stringify(form.variants));
  formData.append("image", form.image);

  return formData;
};

export const calculateDiscount = (
  price: number,
  discount: number | null | undefined
): number => {
  const discountPercent = discount ?? 0;
  return price - price * (discountPercent / 100);
};

export const toRupiah = (value: number): string => {
  const formatted = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
  }).format(value);

  return `Rp. ${formatted}`;
};
