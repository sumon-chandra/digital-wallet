export interface ILogin {
  email: string;
  password: string;
}
export interface ISignup {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

export type TRole = "ADMIN" | "AGENT" | "USER";
