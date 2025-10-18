export type InputConfig =
  | {
      name: keyof FormValues;
      placeholder: string;
      type: "text" | "email" | "password";
    }
  | {
      name: keyof FormValues;
      placeholder: string;
      type: "select";
      options: { value: string; label: string }[];
    };
export type FormValues = {
  name: string;
  email: string;
  role: "USER" | "AGENT" | "";
  password: string;
  address: string;
  phone: string;
};
