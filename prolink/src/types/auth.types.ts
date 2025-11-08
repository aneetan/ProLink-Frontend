 export type Status = "VERIFIED" | "PENDING" | "DECLINED";

export interface User {
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