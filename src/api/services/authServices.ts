import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { LoginRequest, LoginResponse, RegisterRequest } from "../../types/Auth";

export const register = async (data: RegisterRequest): Promise<void> => {
  await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, data);
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, data);
  return response.data;
};
