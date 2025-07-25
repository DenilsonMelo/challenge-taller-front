import api from "@/shared/http/api";
import { AxiosResponse } from "axios";

class ProductService {
  static readonly path = "product";

  async get(): Promise<AxiosResponse> {
    return await api.get(
      `${process.env.NEXT_PUBLIC_API}/${ProductService.path}`
    );
  }
}

const instance = new ProductService();
export default instance;
