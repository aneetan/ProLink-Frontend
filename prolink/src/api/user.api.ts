import type { AxiosResponse } from "axios";
import type { OTPVerifyData, User } from "../types/auth.types";
import axios from "axios";
import { API_URL } from "../utils/url.utils";

export const registerUser = async(formData: User): Promise<AxiosResponse> => {
   const response = await axios.post(`${API_URL}/auth/register`, formData);
   return response;
}

export const verifyOTP = async(formData: OTPVerifyData): Promise<{ resetToken: string }> => {
   const response = await axios.post(`${API_URL}/auth/verify-otp`, formData);
   return response.data;
}
