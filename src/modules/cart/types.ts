import { ProductResponse } from "../products/types";

export type CreateCartItem = {
  productId: string;
  cartId: string;
  quantity: number;
  total: number;
}

export interface CartItemData extends CreateCartItem {
  id: string;
  product: ProductResponse;
  createdAt: string;
  updatedAt: string;
};

export type CartResponse = {
  id: string;
  clientId: string;
  total: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    mail: string;
  };
  cartItems: CartItemData[];
};
