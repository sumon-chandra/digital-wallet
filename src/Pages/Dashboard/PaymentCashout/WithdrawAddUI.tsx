/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type ChangeEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetUserQuery } from "@/redux/api/userApi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";

interface WithdrawAddUIProps {
	action: "Withdraw" | "Add" | "Transfer";
	onSubmit: (body: any) => void;
	isLoading: boolean;
}

const WithdrawAddUI = ({ action, onSubmit, isLoading }: WithdrawAddUIProps) => {
	const [amount, setAmount] = useState(100);
	const [targetEmail, setTargetEmail] = useState("");
	const [debouncedTargetEmail, setDebouncedTargetEmail] = useState(targetEmail);

	useEffect(() => {
		const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
		const match = targetEmail.match(emailRegex);

		const timer = setTimeout(() => {
			if (match) {
				setDebouncedTargetEmail(match[0]);
			}
		}, 500);
		return () => clearTimeout(timer);
	}, [targetEmail]);

	const { data: userWithEmail, isLoading: userWithEMailLoading, error, isSuccess } = useGetUserQuery({ search: debouncedTargetEmail });

	const handleSetUserEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setTargetEmail(e.target.value);
	};

	const handleClick = () => {
		try {
			const user = userWithEmail?.data;
			let body: any = {};
			if (action === "Withdraw") body = { userId: user?._id, amount };
			if (action === "Add") body = { userId: user?._id, amount };
			if (action === "Transfer") body = { receiver_id: targetEmail, amount };
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
						<Label htmlFor="email">Write user email</Label>
						<Input
							id="email"
							type="email"
							placeholder={action === "Transfer" ? "Receiver ID" : "example@gmail.com"}
							value={targetEmail}
							onChange={handleSetUserEmail}
							className="w-full border p-2 rounded"
						/>
						{userWithEMailLoading && (
							<p className="flex items-center text-sm gap-2">
								<LoaderCircle className="animate-spin text-sm" /> <span>Please wait.</span>
							</p>
						)}
						{debouncedTargetEmail && error && <p className="text-destructive pb-2 text-sm">User not found.</p>}
						{isSuccess && <p className="text-primary pb-2 text-sm">User is found.</p>}
						<input
							type="number"
							placeholder="Amount"
							value={amount}
							onChange={(e) => setAmount(Number(e.target.value))}
							min="0"
							className="w-full border p-2 rounded"
						/>

						<Button onClick={handleClick} disabled={isLoading || userWithEMailLoading || !!error} className="w-full">
							{isLoading ? "Processing..." : action}
						</Button>
					</>
				)}
			</CardContent>
		</Card>
	);
};

export default WithdrawAddUI;
