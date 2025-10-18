/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";

type TransactionType = "Withdraw" | "Add" | "Transfer";

interface TransactionResponse {
  data: any;
  body?: any; // For Add Money, to get amount input
}

export const handleTransactionToast = (
  type: TransactionType,
  response: TransactionResponse
) => {
  let message = "";

  if (type === "Withdraw") {
    message = `Withdraw: $${response.data.withdrawMoney} | Fee: $${response.data.transactionFee} | User Balance: $${response.data.userWallet.balance}`;
  } else if (type === "Add") {
    message = `Added: $${response.body?.amount} | User Balance: $${response.data.userWallet.balance}`;
  } else if (type === "Transfer") {
    message = `Transferred: $${response.data.transferMoney} | Fee: $${response.data.transactionFee} | Sender Balance: $${response.data.senderWallet.balance} | Receiver Balance: $${response.data.receiverWallet.balance}`;
  }

  toast.success(message, { autoClose: 5000 });
};
