/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { handleApiError } from "@/utils/handleApiError";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({ email: "", password: "" });
	const [showPassword, setShowPassword] = useState(false);

	const [loginUser, { isLoading }] = useLoginUserMutation();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const togglePasswordVisibility = () => setShowPassword(!showPassword);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			console.log("🔗 Sending login request to:", form);
			const result = await loginUser(form).unwrap();
			console.log("✅ Login response:", result);

			if (result.token) sessionStorage.setItem("authToken", result.token);

			if (result?.data?.user?.is_active === "BLOCKED" || result?.data?.user?.is_active === "SUSPEND") {
				navigate("/login");
				toast.error(`User is ${result?.data?.user?.is_active}`);
			} else {
				toast.success("Logged in successfully!");
				navigate("/");
			}
		} catch (err: any) {
			handleApiError(err);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-background">
			<Card className="w-full max-w-md bg-card border border-input rounded-2xl shadow-xl p-6">
				<CardHeader className="text-center">
					<CardTitle className="text-3xl md:text-4xl font-extrabold text-primary mb-2">Login</CardTitle>
					<p className="text-muted-foreground text-sm md:text-base">Welcome back! Please login to access your account.</p>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-6">
						<Input
							type="email"
							placeholder="Email Address"
							name="email"
							value={form.email}
							onChange={handleChange}
							required
							className="w-full p-3 rounded-lg bg-background text-foreground border border-input focus:border-primary focus:ring-2 focus:ring-primary placeholder:text-muted-foreground transition"
						/>
						<div className="relative">
							<Input
								type={showPassword ? "text" : "password"}
								placeholder="Password"
								name="password"
								value={form.password}
								onChange={handleChange}
								required
								className="w-full p-3 pr-12 rounded-lg bg-background text-foreground border border-input focus:border-primary focus:ring-2 focus:ring-primary placeholder:text-muted-foreground transition"
							/>
							<button
								type="button"
								onClick={togglePasswordVisibility}
								className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-primary transition-colors duration-200"
							>
								{showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
							</button>
						</div>
						<Button
							type="submit"
							className="w-full py-3 bg-primary text-primary-foreground font-semibold text-lg rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-md"
							disabled={isLoading}
						>
							{isLoading ? "Logging in..." : "Login"}
						</Button>
					</form>

					<p className="text-center text-sm text-muted-foreground mt-6">
						Don’t have an account?{" "}
						<Link to="/signup" className="text-primary font-semibold underline hover:text-primary/80 transition-colors duration-300">
							Sign Up
						</Link>
					</p>
				</CardContent>
			</Card>
		</div>
	);
};

export default Login;
