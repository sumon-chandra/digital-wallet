import { useState } from "react";
import { useCreateBlockWalletMutation } from "@/redux/api/adminApi";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";
import { DollarSign, Lock, Unlock, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

type WalletActionType = "addMoney" | "updateStatus";

interface WalletManagementProps {
	actionType: WalletActionType;
}

const WalletManagementByAdmin = ({ actionType }: WalletManagementProps) => {
	const [walletId, setWalletId] = useState("");
	const [rawBalance, setBalance] = useState("");
	const [status, setStatus] = useState("");

	const [createBlockWallet, { isLoading }] = useCreateBlockWalletMutation();

	const handleAddBalance = async () => {
		if (!walletId || !rawBalance) {
			toast.error("Please enter wallet ID and amount");
			return;
		}

		const balance = parseInt(rawBalance);
		try {
			await createBlockWallet({ id: walletId, body: { balance } }).unwrap();
			toast.success(`Added ${balance} to wallet successfully!`);
			setBalance("");
			setWalletId("");
		} catch (err) {
			handleApiError(err);
		}
	};

	const handleUpdateStatus = async () => {
		if (!walletId || !status) {
			toast.error("Please enter wallet ID and select status");
			return;
		}

		try {
			await createBlockWallet({ id: walletId, body: { status } }).unwrap();
			toast.success(`Wallet status updated to "${status}"!`);
			setStatus("");
			setWalletId("");
		} catch (err) {
			handleApiError(err);
		}
	};

	const isAddMoney = actionType === "addMoney";
	const buttonDisabled = !walletId || (isAddMoney ? !rawBalance : !status) || isLoading;

	return (
		<div className="max-w-full mx-auto p-6 rounded-xl shadow-2xl border space-y-8 lg:p-12 xl:p-16">
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
						<label className="block text-sm lg:text-base font-medium mb-2">Update Status</label>
						<select
							value={status}
							onChange={(e) => setStatus(e.target.value)}
							className="w-full border rounded-lg px-5 py-3 lg:px-6 lg:py-3.50 focus:ring-2 ring-primary focus:border-transparent transition-colors"
						>
							<option value="">Select Status</option>
							<option value="ACTIVE">ACTIVE</option>
							<option value="BLOCKED">BLOCKED</option>
						</select>
					</div>
				)}

				<button
					onClick={isAddMoney ? handleAddBalance : handleUpdateStatus}
					disabled={buttonDisabled}
					className={`w-full flex items-center justify-center gap-2 px-6 py-3 lg:px-8 lg:py-4 rounded-lg text-white font-semibold text-lg transition-colors ${
						isAddMoney
							? "bg-primary hover:bg-primary-dark disabled:bg-primary/50 disabled:cursor-alias"
							: status === "BLOCKED"
							? "bg-destructive hover:bg-destructive-dark disabled:bg-destructive/50 disabled:cursor-alias"
							: "bg-balance hover:bg-balance-dark disabled:bg-balance/50 disabled:cursor-alias"
					}`}
				>
					{isLoading ? (
						<>
							<Loader2 className="w-6 h-6 animate-spin" />
							{isAddMoney ? "Adding..." : "Updating..."}
						</>
					) : isAddMoney ? (
						"Add Balance"
					) : (
						"Update Status"
					)}
				</button>
			</div>
		</div>
	);
};

export default WalletManagementByAdmin;
