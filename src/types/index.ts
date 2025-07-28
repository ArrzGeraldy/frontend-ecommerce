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

export interface VariantWithProduct extends Variant {
  product: Product;
}

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

export type CartAddType = {
  product_variant_id: number;
  quantity: number;
};

export type CartItemType = {
  id: number;
  user_id: number;
  product_variant_id: number;
  quantity: number;
  created_at: string;
  product_variant: VariantWithProduct;
  amount: number;
};

export type OrderCreateType = {
  items: Array<{
    product_variant_id: number;
    quantity: number;
  }>;
};

export type PaymentType = {
  id: number;
  order_id: string;
  method: string;
  bank: string;
  va_number: string;
  status: string;
  created_at: string; // ISO date string
  updated_at: string;
  expiry_time: string;
};

export type OrderItemType = {
  id: number;
  order_id: number;
  product_variant_id: number;
  quantity: number;
  amount: number;
  created_at: string;
  product_variant: {
    name: string;
    product: {
      name: string;
      price: number;
      discount: number | null;
      img_url: string;
    };
  };
};
export type OrderType = {
  id: string;
  user_id: number;
  base_price: number;
  final_price: number;
  status: string;
  created_at: string;
  updated_at: string;
  order_items: OrderItemType[];

  payment: null;
  shipping: null;
};

export type AddressType = {
  id: number;
  user_id: number;
  recipient_name: string;
  phone: string;
  province: string;
  city: string;
  postal_code: string;
  detail?: string;
  is_primary: boolean;
  deleted_at?: Date;
  created_at: Date;
};

export type AddressCreateType = {
  recipient_name: string;
  phone: string;
  province: string;
  city: string;
  postal_code: string;
  detail?: string;
};

export type OrderCreatePaymentType = {
  shipping_courier: string;
  bank: string;
  address: AddressCreateType;
};
