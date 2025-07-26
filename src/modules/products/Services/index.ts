import api from "@/shared/http/api";
import { AxiosResponse } from "axios";

class ProductService {
  static readonly path = "product";

  async create(data: FormData): Promise<AxiosResponse> {
    return await api.post(
      `${process.env.NEXT_PUBLIC_API}/${ProductService.path}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  async update(id: string, data: Partial<FormData>): Promise<AxiosResponse> {
    return await api.patch(
      `${process.env.NEXT_PUBLIC_API}/${ProductService.path}/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  async get(): Promise<AxiosResponse> {
    return await api.get(
      `${process.env.NEXT_PUBLIC_API}/${ProductService.path}`
    );
  }

  async delete(id: string): Promise<AxiosResponse> {
    return await api.delete(
      `${process.env.NEXT_PUBLIC_API}/${ProductService.path}/${id}`
    );
  }
}

const instance = new ProductService();
export default instance;
