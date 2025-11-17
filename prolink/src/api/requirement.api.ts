import type { AxiosResponse } from "axios";
import { API_URL } from "../utils/url.utils";
import axios from "axios";
import type { RequirementFormData } from "../types/requirement.types";

export const addRequirement = async(formData: RequirementFormData) : Promise<AxiosResponse> => {
   const token = localStorage.getItem("token");
   const response = await axios.post(`${API_URL}/client/requirement/create`, formData, {
      headers: {
         Authorization: `Bearer ${token}`
      }
   });
   return response;
} 