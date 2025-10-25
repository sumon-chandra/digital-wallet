import { ArrowDownCircle, ArrowUpCircle, Copy } from "lucide-react";
import type { TransactionType, TransactionUiProps } from "@/types/admin.type";
import { Button } from "@/components/ui/button";
import { useState, type JSX } from "react";
import { formatDate, formatTime } from "@/utils/dataTime";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
		<div className="border border-border rounded-lg overflow-hidden bg-background">
			<Table className="w-full">
				<TableHeader>
					<TableRow className="bg-accent hover:bg-accent *:font-bold">
						<TableHead>Type</TableHead>
						<TableHead>Amount</TableHead>
						<TableHead>Date</TableHead>
						<TableHead>Transaction ID</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((tx) => (
						<TableRow key={tx._id.toLocaleUpperCase()} className="hover:bg-accent/50 transition-colors">
							{/* Type Column */}
							<TableCell>
								<div className="flex items-center gap-3">
									{typeIcons[tx.type] || <ArrowDownCircle className="h-4 w-4 text-slate-400" />}
									<span className="text-sm font-medium text-slate-900 dark:text-slate-100">{typeLabels[tx.type] || tx.type}</span>
								</div>
							</TableCell>

							{/* Amount Column */}
							<TableCell>
								<span className="text-sm font-semibold text-slate-900 dark:text-slate-100">৳{tx.amount.toLocaleString()}</span>
							</TableCell>

							{/* Date Column */}
							<TableCell>
								<div className="text-sm">
									<div className="text-slate-900 dark:text-slate-100 font-medium">{formatDate(tx.createdAt!)}</div>
									<div className="text-xs text-slate-500 dark:text-slate-400">{formatTime(tx.createdAt!)}</div>
								</div>
							</TableCell>

							{/* Transaction ID Column */}
							<TableCell>
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
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

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
