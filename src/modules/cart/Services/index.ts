import api from "@/shared/http/api";
import { AxiosResponse } from "axios";

class CartService {
  static readonly path = "cart";

  async getMyCart(): Promise<AxiosResponse> {
    return await api.get(
      `${process.env.NEXT_PUBLIC_API}/${CartService.path}/my-cart`
    );
  }
}

const instance = new CartService();
export default instance;
