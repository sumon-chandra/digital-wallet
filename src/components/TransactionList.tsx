import { ShowTransactionTypeOnOverview } from "@/helper";
import type { ITransaction, TransactionType } from "@/types/admin.type";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface Props {
	txn: ITransaction;
	isPositive: (type: TransactionType) => boolean;
}

const TransactionList = ({ txn, isPositive }: Props) => {
	const getTransactionIcon = (type: TransactionType) => {
		const iconProps = "size-5";

		if (isPositive(type)) {
			return <ArrowDownLeft className={`${iconProps} text-emerald-500`} />;
		}
		return <ArrowUpRight className={`${iconProps} text-rose-500`} />;
	};
	return (
		<li className="flex items-center justify-between p-4 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors duration-200 border border-secondary">
			<div className="flex items-center gap-3 flex-1">
				<div className={`w-10 h-10 rounded-lg flex items-center justify-center ${txn.amount >= 0 ? "bg-emerald-500/10" : "bg-rose-500/10"}`}>
					{getTransactionIcon(txn.type)}
				</div>
				<div className="flex-1 min-w-0">
					<p className="font-semibold text-sm text-foreground truncate">{ShowTransactionTypeOnOverview(txn.type)}</p>
					<p className="text-xs text-muted-foreground mt-0.5">{txn.createdAt ? new Date(txn.createdAt).toLocaleString() : "—"}</p>
				</div>
			</div>

			<div className={`font-bold text-lg ml-4 ${isPositive(txn.type) ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
				{isPositive(txn.type) ? "+" : "-"}
				{txn.amount.toFixed(2)}
			</div>
		</li>
	);
};

export default TransactionList;
