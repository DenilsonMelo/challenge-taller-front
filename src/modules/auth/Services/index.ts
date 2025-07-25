import api from "@/shared/http/api";
import { AxiosResponse } from "axios";
import { LoginData } from "../Login/types";
import { RegisterData } from "../Register/types";

class AuthService {
  static readonly path = "auth";

  login(data: LoginData): Promise<AxiosResponse> {
    return api.post(`${AuthService.path}/login`, data);
  }

  register(data: RegisterData): Promise<AxiosResponse> {
    return api.post(`${AuthService.path}/register`, data);
  }
}

const instance = new AuthService();
export default instance;
