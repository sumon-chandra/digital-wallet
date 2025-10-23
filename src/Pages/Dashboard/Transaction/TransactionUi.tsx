import { Badge } from "@/components/ui/badge";
import { ArrowDownCircle, ArrowUpCircle, Copy } from "lucide-react";
import type { TransactionType, TransactionUiProps } from "@/types/admin.type";
import { Button } from "@/components/ui/button";
import { useState, type JSX } from "react";
import { formatDate, formatTime } from "@/utils/dataTime";
import { copyToClipboard } from "@/utils/copyToClipboard";

const statusColors: Record<string, string> = {
	COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-200",
	PENDING: "bg-amber-50 text-amber-700 border-amber-200",
	FAILED: "bg-rose-50 text-rose-700 border-rose-200",
};

const typeIcons: Record<TransactionType, JSX.Element> = {
	CASH_OUT: <ArrowUpCircle className="h-4 w-4 text-rose-500" />,
	CASH_IN: <ArrowDownCircle className="h-4 w-4 text-emerald-500" />,
	WITHDRAW: <ArrowUpCircle className="h-4 w-4 text-rose-500" />,
	RECEIVE_MONEY: <ArrowDownCircle className="h-4 w-4 text-emerald-500" />,
	SEND_MONEY: <ArrowUpCircle className="h-4 w-4 text-rose-500" />,
	TOP_UP: <ArrowDownCircle className="h-4 w-4 text-emerald-500" />,
};

const typeLabels: Record<TransactionType, string> = {
	CASH_OUT: "Cash Out",
	CASH_IN: "Cash In",
	WITHDRAW: "Withdrawal",
	RECEIVE_MONEY: "Receive Money",
	SEND_MONEY: "Send Money",
	TOP_UP: "Top Up",
};

function TransactionUiTable({ data }: TransactionUiProps) {
	const [copiedId, setCopiedId] = useState<string | null>(null);

	const handleCopyId = async (id: string) => {
		const success = await copyToClipboard(id);
		if (success) {
			setCopiedId(id);
			setTimeout(() => setCopiedId(null), 2000);
		}
	};

	return (
		<div className="w-full overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
							<th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Type</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Amount</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Status</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Date</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Transaction ID</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-200 dark:divide-slate-800">
						{data.map((tx) => (
							<tr key={tx._id.toLocaleUpperCase()} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors group">
								{/* Type Column */}
								<td className="px-6 py-4">
									<div className="flex items-center gap-3">
										{typeIcons[tx.type] || <ArrowDownCircle className="h-4 w-4 text-slate-400" />}
										<span className="text-sm font-medium text-slate-900 dark:text-slate-100">{typeLabels[tx.type] || tx.type}</span>
									</div>
								</td>

								{/* Amount Column */}
								<td className="px-6 py-4">
									<span className="text-sm font-semibold text-slate-900 dark:text-slate-100">৳{tx.amount.toLocaleString()}</span>
								</td>

								{/* Status Column */}
								<td className="px-6 py-4">
									<Badge
										variant="outline"
										className={`${
											statusColors[tx.type] || "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
										} text-xs font-medium`}
									>
										{tx.type}
									</Badge>
								</td>

								{/* Date Column */}
								<td className="px-6 py-4">
									<div className="text-sm">
										<div className="text-slate-900 dark:text-slate-100 font-medium">{formatDate(tx.createdAt!)}</div>
										<div className="text-xs text-slate-500 dark:text-slate-400">{formatTime(tx.createdAt!)}</div>
									</div>
								</td>

								{/* Transaction ID Column */}
								<td className="px-6 py-4">
									<Button
										variant="ghost"
										size="sm"
										className="h-8 px-2 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
										onClick={() => handleCopyId(tx._id)}
									>
										<span className="font-mono">{tx._id.substring(0, 8)}...</span>
										<Copy className="h-3 w-3 ml-2" />
										{copiedId === tx._id && <span className="ml-2 text-emerald-600 dark:text-emerald-400 text-xs">✓</span>}
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Empty state */}
			{data.length === 0 && (
				<div className="px-6 py-12 text-center">
					<p className="text-sm text-slate-500 dark:text-slate-400">No transactions found</p>
				</div>
			)}
		</div>
	);
}

export default TransactionUiTable;
