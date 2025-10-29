type Role = "client" | "company";
enum Status {
   verified,
   pending
};

export interface User {
   name: string;
   email: string;
   phone: string;
   address: string;
   role: Role;
   password: string;
   confirmPassword: string;
   status?: Status;
}