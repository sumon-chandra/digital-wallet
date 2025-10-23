import type { TransactionType } from "@/types/admin.type";

export const ShowTransactionTypeOnOverview = (type: TransactionType) => {
	switch (type) {
		case "TOP_UP":
			return "Deposit";
		case "WITHDRAW":
			return "Withdraw";
		case "SEND_MONEY":
			return "Transfer";
		case "RECEIVE_MONEY":
			return "Receive";
		case "CASH_IN":
			return "Cash In";
		case "CASH_OUT":
			return "Cash Out";
		default:
			return type;
	}
};
