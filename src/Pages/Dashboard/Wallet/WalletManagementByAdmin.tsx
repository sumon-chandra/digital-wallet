import { useState } from "react";
import { useCreateBlockWalletMutation } from "@/redux/api/adminApi";
import { toast } from "react-toastify";
import { handleApiError } from "@/utils/handleApiError";
import { DollarSign, Lock, Unlock, Loader2 } from "lucide-react";

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
  const buttonDisabled =
    !walletId || (isAddMoney ? !rawBalance : !status) || isLoading;

  return (
    <div className="max-w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-pink-200 dark:border-pink-900/50 space-y-8 lg:p-12 xl:p-16">
      <div className="flex items-center gap-4 lg:gap-6">
        <div className="p-3 lg:p-4 bg-pink-100 dark:bg-pink-900/40 rounded-xl">
          {isAddMoney ? (
            <DollarSign className="w-8 h-8 lg:w-10 lg:h-10 text-pink-600 dark:text-pink-400" />
          ) : status === "BLOCKED" ? (
            <Lock className="w-8 h-8 lg:w-10 lg:h-10 text-pink-600 dark:text-pink-400" />
          ) : (
            <Unlock className="w-8 h-8 lg:w-10 lg:h-10 text-pink-600 dark:text-pink-400" />
          )}
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-100">
          {isAddMoney ? "Add Money to Wallet" : "Block / Activate Wallet"}
        </h2>
      </div>

      <div className="space-y-6 lg:space-y-8">
        <div>
          <label className="block text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
            Wallet ID
          </label>
          <input
            type="text"
            placeholder="Enter Wallet ID"
            value={walletId}
            onChange={(e) => setWalletId(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-5 py-3 lg:px-6 lg:py-3.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
          />
        </div>

        {isAddMoney ? (
          <div>
            <label className="block text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount to Add
            </label>
            <input
              type="number"
              value={rawBalance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="Enter amount"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-5 py-3 lg:px-6 lg:py-3.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
              Update Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-5 py-3 lg:px-6 lg:py-3.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
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
              ? "bg-pink-600 hover:bg-pink-700 disabled:bg-pink-400"
              : status === "BLOCKED"
              ? "bg-rose-600 hover:bg-rose-700 disabled:bg-rose-400"
              : "bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400"
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
