import api from "@/shared/http/api";
import { AxiosResponse } from "axios";

class OrderService {
  static readonly path = "order";

  async create({cartId}: {cartId: string}): Promise<AxiosResponse> {
    return await api.post(
      `${process.env.NEXT_PUBLIC_API}/${OrderService.path}`,
        { cartId }
    );
  }
}

const instance = new OrderService();
export default instance;
