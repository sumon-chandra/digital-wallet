import { useState } from "react";
import { useChangeWalletStatusMutation } from "@/redux/api/adminApi";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";
import { DollarSign, Lock, Unlock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppButton from "@/components/AppButton";

type WalletActionType = "addMoney" | "updateStatus";

interface WalletManagementProps {
	actionType: WalletActionType;
}

const WalletManagementByAdmin = ({ actionType }: WalletManagementProps) => {
	const [walletId, setWalletId] = useState("");
	const [rawBalance, setBalance] = useState("");
	const [walletStatus, setWalletStatus] = useState("");
	const navigate = useNavigate();

	const [changeWalletStatus, { isLoading }] = useChangeWalletStatusMutation();

	const handleAddBalance = async () => {
		if (!walletId || !rawBalance) {
			toast.error("Please enter wallet ID and amount");
			return;
		}

		const balance = parseInt(rawBalance);
		try {
			await changeWalletStatus({ id: walletId, body: { balance } }).unwrap();
			toast.success(`Added ${balance} to wallet successfully!`);
			setBalance("");
			setWalletId("");
			navigate("/admin/dashboard/all-wallet");
		} catch (err) {
			handleApiError(err);
		}
	};

	const handleUpdateStatus = async () => {
		if (!walletId || !walletStatus) {
			toast.error("Please enter wallet ID and select status");
			return;
		}

		try {
			await changeWalletStatus({ id: walletId, body: { walletStatus } }).unwrap();
			toast.success(`Wallet status updated to "${walletStatus}"!`);
			setWalletStatus("");
			setWalletId("");
			navigate("/admin/dashboard/all-wallet");
		} catch (err) {
			handleApiError(err);
		}
	};

	const isAddMoney = actionType === "addMoney";
	const buttonDisabled = !walletId || (isAddMoney ? !rawBalance : !walletStatus) || isLoading;

	return (
		<div className="max-w-full mx-auto p-6 rounded-xl shadow-2xl border space-y-8 lg:p-12 xl:p-16 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
			<div>
				<div className="flex items-center gap-4 lg:gap-6">
					<div className="p-3 lg:p-4 rounded-xl">
						{isAddMoney ? (
							<DollarSign className="w-8 h-8 lg:w-10 lg:h-10" />
						) : status === "BLOCKED" ? (
							<Lock className="w-8 h-8 lg:w-10 lg:h-10" />
						) : (
							<Unlock className="w-8 h-8 lg:w-10 lg:h-10" />
						)}
					</div>
					<h2 className="text-2xl lg:text-3xl font-bold">{isAddMoney ? "Add Money to Wallet" : "Block / Activate Wallet"}</h2>
				</div>
				<p className="mt-4 text-gray-600 dark:text-gray-400">
					Before proceeding, please ensure you have the correct Wallet ID. You will find Wallet ID from{" "}
					<Link to="/admin/dashboard/all-wallet" className="text-primary hover:underline">
						here
					</Link>
					.
				</p>
			</div>

			<div className="space-y-6 lg:space-y-8">
				<div>
					<label className="block text-sm lg:text-base font-medium mb-2">Wallet ID</label>
					<input
						type="text"
						placeholder="Enter Wallet ID"
						value={walletId}
						onChange={(e) => setWalletId(e.target.value)}
						className="w-full border rounded-lg px-5 py-3 lg:px-6 lg:py-3.5 focus:ring-2 ring-primary focus:border-transparent transition-colors"
					/>
				</div>

				{isAddMoney ? (
					<div>
						<label className="block text-sm lg:text-base font-medium mb-2">Amount to Add</label>
						<input
							type="number"
							value={rawBalance}
							onChange={(e) => setBalance(e.target.value)}
							placeholder="Enter amount"
							className="w-full border rounded-lg px-5 py-3 lg:px-6 lg:py-3.5 focus:ring-2 ring-primary focus:border-transparent transition-colors"
						/>
					</div>
				) : (
					<div>
						<Select value={walletStatus} onValueChange={(val: string) => setWalletStatus(val)}>
							<SelectTrigger className="w-full border rounded-lg px-5 py-3 lg:px-6 lg:py-3.5 focus:ring-2 ring-primary focus:border-transparent transition-colors">
								<SelectValue placeholder="Select Status" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Status</SelectLabel>
									<SelectItem value="ACTIVE">Active</SelectItem>
									<SelectItem value="INACTIVE">Inactive</SelectItem>
									<SelectItem value="BLOCKED">Blocked</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				)}

				<AppButton
					disabled={buttonDisabled}
					isLoading={isLoading}
					label={isAddMoney ? "Add Balance" : "Update Status"}
					onClick={isAddMoney ? handleAddBalance : handleUpdateStatus}
					className="w-full"
				/>
			</div>
		</div>
	);
};

export default WalletManagementByAdmin;
