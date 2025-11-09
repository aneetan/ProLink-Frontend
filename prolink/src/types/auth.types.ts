 export type Status = "VERIFIED" | "PENDING" | "DECLINED";

export interface User {
   id?: number;
   name: string;
   email: string;
   phone: string;
   address: string;
   role: "CLIENT" | "COMPANY" | "ADMIN";
   password: string;
   confirmPassword: string;
   status?: Status; 
}

export interface OTPVerifyData{
    token: string;
    email: string;
    otp: string;
}

export interface LoginProps {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    message: string;
    id: number;
}