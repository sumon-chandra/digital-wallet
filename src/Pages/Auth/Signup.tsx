/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCreateUserMutation } from "@/redux/api/authApi";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { handleApiError } from "@/utils/handleApiError";
import type { FormValues, InputConfig } from "@/types/InputConfig.type";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormValues>({
    name: "",
    email: "",
    role: "",
    password: "",
    address: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const key = e.target.name as keyof FormValues;
    let value = e.target.value;

    if (key === "role") value = value.toUpperCase();

    setForm({ ...form, [key]: value });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUser(form).unwrap();
      toast.success("Account created successfully! ✅");
      navigate("/login");
    } catch (err: any) {
      handleApiError(err);
    }
  };

  const inputs: InputConfig[] = [
    { name: "name", placeholder: "Full Name", type: "text" },
    { name: "email", placeholder: "Email Address", type: "email" },
    {
      name: "role",
      placeholder: "Select role",
      type: "select",
      options: [
        { value: "USER", label: "USER" },
        { value: "AGENT", label: "AGENT" },
      ],
    },
    { name: "password", placeholder: "Password", type: "password" },
    { name: "address", placeholder: "Address", type: "text" },
    { name: "phone", placeholder: "Phone Number", type: "text" },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md bg-card border border-input rounded-2xl shadow-xl p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-extrabold text-primary mb-2">
            Create Account
          </CardTitle>
          <p className="text-muted-foreground text-sm md:text-base">
            Welcome! Fill in the form to create your account.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {inputs.map((input) => {
              if (input.type === "select") {
                return (
                  <div key={input.name} className="relative">
                    <select
                      name={input.name}
                      value={form[input.name]}
                      onChange={handleChange}
                      required
                      className="w-full p-3 pr-12 rounded-lg bg-background text-foreground border border-input focus:border-primary focus:ring-2 focus:ring-primary appearance-none cursor-pointer text-base placeholder:text-muted-foreground transition"
                    >
                      <option value="" disabled>
                        {input.placeholder}
                      </option>
                      {input.options.map((opt) => (
                        <option
                          key={opt.value}
                          value={opt.value}
                          className="bg-background text-foreground"
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-primary">
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                );
              } else if (input.type === "password") {
                return (
                  <div key={input.name} className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder={input.placeholder}
                      name={input.name}
                      value={form[input.name]}
                      onChange={handleChange}
                      required
                      className="w-full p-3 pr-12 rounded-lg bg-background text-foreground border border-input focus:border-primary focus:ring-2 focus:ring-primary placeholder:text-muted-foreground transition"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {showPassword ? (
                        <EyeOff className="h-6 w-6" />
                      ) : (
                        <Eye className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                );
              } else {
                return (
                  <Input
                    key={input.name}
                    type={input.type}
                    placeholder={input.placeholder}
                    name={input.name}
                    value={form[input.name]}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg bg-background text-foreground border border-input focus:border-primary focus:ring-2 focus:ring-primary placeholder:text-muted-foreground transition"
                  />
                );
              }
            })}
            <Button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground font-semibold text-lg rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-md"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Sign Up"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold underline hover:text-primary/80 transition-colors duration-300"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
