import type { AxiosResponse } from "axios";
import type { User } from "../types/auth.types";
import axios from "axios";
import { API_URL } from "../utils/url.utils";

export const registerUser = async(formData: User): Promise<AxiosResponse> => {
   const response = await axios.post(`${API_URL}/auth/register`, formData);
   return response;
}