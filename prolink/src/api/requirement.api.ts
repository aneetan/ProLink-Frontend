import type { AxiosResponse } from "axios";
import { API_URL } from "../utils/url.utils";
import axios from "axios";
import type { RequirementFormData } from "../types/client/requirement.types";
import { api } from "../lib/api";

export const addRequirement = async(formData: RequirementFormData) : Promise<AxiosResponse> => {
   const token = localStorage.getItem("token");
   const response = await axios.post(`${API_URL}/client/requirement/create`, formData, {
      headers: {
         Authorization: `Bearer ${token}`
      }
   });
   return response;
} 

export const getRequirementsForUser = async (): Promise<AxiosResponse> => {
  const res = await api.get("/client/requirement");
  return res.data;
};