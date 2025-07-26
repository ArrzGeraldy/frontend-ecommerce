import type { CategoryProduct } from "./response";

export type User = {
  id: number;
  email: string;
  username: string;
  role: string;
};

export type AuthType = {
  user: User;
  accessToken: string;
};

export type APIErrorResponse = {
  errors: string;
};

export type FormDataCategoryType = {
  name: string;
  parent_id: number | null;
};

export type TargetToDeleteType = {
  id: null | number | string;
  name: string | null;
};

// product
export type VariantType = {
  id?: number;
  name: string;
  stock: number;
  price_diff: number;
};

export type Variant = {
  id: number;
  product_id: string;
  name: string;
  price_diff: number;
  stock: number;
  updated_at: string;
  is_active: boolean;
  deleted_at: null | string;
};

export type FormDataProductType = {
  name: string;
  description: string;
  price: string;
  cost_price: string;
  discount?: string | null;
  category_id: string;
  image: File | string;
  variants: VariantType[];
};

export type Product = {
  id: string;
  name: string;
  category_id: number;
  price: number;
  is_active: boolean;
  deleted_at: string | null;
  description: string;
  discount: number | null;
  img_url: string;
  total_sale: number;
  updated_at: string;
  created_at: string;
  category: CategoryProduct;
  product_variants: Variant[];
  cost_price?: number;
};

export type ProductsQuery = {
  page: number;
  limit: number;
  sort: string;
  search: string;
  parent: string;
  category?: number;
};
