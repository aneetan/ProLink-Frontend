import type { AxiosResponse } from "axios";
import { API_URL } from "../utils/url.utils";
import axios from "axios";
import type { FormData } from "../types/company.types";

export const createCompanyProfile = async(formData: FormData) : Promise<AxiosResponse> => {
   const token = localStorage.getItem("token");
   const response = await axios.post(`${API_URL}/company/create`, formData, {
      headers: {
         Authorization: `Bearer ${token}`
      }
   });
   return response;
} 