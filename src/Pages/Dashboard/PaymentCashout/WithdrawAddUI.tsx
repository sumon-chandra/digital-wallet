/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type ChangeEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSelectUserQuery } from "@/redux/api/userApi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShowUserResponse } from "./ShowUserResponse";
import type { Role } from "@/types/user.type";

interface WithdrawAddUIProps {
	action: "Withdraw" | "Add" | "Transfer";
	onSubmit: (body: any) => void;
	isLoading: boolean;
	userRole: Role;
}

const WithdrawAddUI = ({ action, onSubmit, isLoading, userRole }: WithdrawAddUIProps) => {
	const [amount, setAmount] = useState(100);
	const [targetEmail, setTargetEmail] = useState<string>();
	const [debouncedTargetEmail, setDebouncedTargetEmail] = useState(targetEmail);

	useEffect(() => {
		const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
		const match = targetEmail?.match(emailRegex);

		const timer = setTimeout(() => {
			if (match && match?.length > 0) {
				console.log({ match });
				setDebouncedTargetEmail(match[0]);
			}
		}, 500);
		return () => clearTimeout(timer);
	}, [targetEmail]);

	const {
		data: userWithEmail,
		isLoading: userWithEMailLoading,
		isSuccess,
		isError,
		error: userNotFound,
	} = useSelectUserQuery({ search: debouncedTargetEmail!, method: action, role: userRole });
	const user = userWithEmail?.data;
	// console.log(userWithEmail);

	const handleSetUserEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setTargetEmail(e.target.value);
	};

	// const withdrawMoney = debouncedTargetEmail && action === "Withdraw" && user?.role === "AGENT";
	// const transferMoney = debouncedTargetEmail && action === "Transfer" && user?.role === "USER";
	// const addMoney = debouncedTargetEmail && action === "Add" && user?.role === "AGENT";

	// function isErrorResponse(action: string, role: string): boolean {
	// 	if (!debouncedTargetEmail) return true;
	// 	if (action === "Withdraw") return role !== "AGENT";
	// 	if (action === "Transfer") return role !== "USER";
	// 	if (action === "Add") return role !== "AGENT";
	// 	return true;
	// }

	const handleClick = () => {
		try {
			let body: any = {};
			if (action === "Withdraw") body = { userId: user?._id, amount };
			if (action === "Add") body = { userId: user?._id, amount };
			if (action === "Transfer") body = { userId: user?._id, amount };
			console.log(body);
			onSubmit(body);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Card className="max-w-md mx-auto shadow-sm border hover:shadow-md transition-all">
			<CardHeader>
				<CardTitle>{action} Money</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{(action === "Withdraw" || action === "Add" || action === "Transfer") && (
					<>
						<Label htmlFor="email">Write {action === "Withdraw" ? "agent" : "user"} email</Label>
						<Input
							id="email"
							type="email"
							placeholder={action === "Withdraw" ? "agent@gmail.com" : "user@gmail.com"}
							value={targetEmail}
							onChange={handleSetUserEmail}
							className="w-full border p-2 rounded"
						/>
						<ShowUserResponse loading={userWithEMailLoading} error={debouncedTargetEmail! && !!userNotFound} success={isSuccess} />
						<input
							type="number"
							placeholder="Amount"
							value={amount}
							onChange={(e) => setAmount(Number(e.target.value))}
							min="0"
							className="w-full border p-2 rounded"
						/>

						<Button onClick={handleClick} disabled={isLoading || userWithEMailLoading || isError} className="w-full">
							{isLoading ? "Processing..." : action}
						</Button>
					</>
				)}
			</CardContent>
		</Card>
	);
};

export default WithdrawAddUI;
