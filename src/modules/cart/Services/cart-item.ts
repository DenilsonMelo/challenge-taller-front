import api from "@/shared/http/api";
import { AxiosResponse } from "axios";
import { CartItemData, CreateCartItem } from "../types";

class CartItemService {
  static readonly path = "cart-item";

  async create(data: CreateCartItem): Promise<AxiosResponse> {
    return await api.post(
      `${process.env.NEXT_PUBLIC_API}/${CartItemService.path}`,
      data
    );
  }

  async update(id: string, data: Partial<CartItemData>): Promise<AxiosResponse> {
    return await api.patch(
      `${process.env.NEXT_PUBLIC_API}/${CartItemService.path}/${id}`,
      data
    );
  }

  async remove(id: string): Promise<AxiosResponse> {
    return await api.delete(
      `${process.env.NEXT_PUBLIC_API}/${CartItemService.path}/${id}`
    );
  }
}

const instance = new CartItemService();
export default instance;
