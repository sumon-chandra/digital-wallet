import React from "react";
import { Card, CardTitle } from "@/components/ui/card";
import type { RecentActivitiesUiProps } from "@/types/overview.type";
import { ShowTransactionTypeOnOverview } from "@/helper";
import { ArrowUpRight, ArrowDownLeft, TrendingUp } from "lucide-react";
import type { TransactionType } from "@/types/admin.type";

const RecentActivitiesUi: React.FC<RecentActivitiesUiProps> = ({ activities = [], loading, role }) => {
	const isPositive = (type: TransactionType) => {
		if (type === "TOP_UP" || type === "RECEIVE_MONEY" || type === "CASH_IN") {
			return true;
		}
		return false;
	};

	const getTransactionIcon = (type: TransactionType) => {
		const iconProps = "size-5";

		if (isPositive(type)) {
			return <ArrowDownLeft className={`${iconProps} text-emerald-500`} />;
		}
		return <ArrowUpRight className={`${iconProps} text-rose-500`} />;
	};

	return (
		<Card className="p-0 rounded-2xl shadow-md overflow-hidden border-0">
			<div className="px-6 py-5 border-b border-border bg-gradient-to-r from-card to-card">
				<CardTitle className="text-lg font-semibold text-foreground">
					{role === "ADMIN" ? "All Recent Transactions" : role === "USER" ? "Recent Transactions" : role === "AGENT" ? "Recent Commissions" : ""}
				</CardTitle>
				<p className="text-xs text-muted-foreground mt-1">Latest activity on your account</p>
			</div>

			<div className="px-6 py-4">
				{loading ? (
					<div className="flex items-center justify-center py-8">
						<div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
					</div>
				) : activities.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-12 text-center">
						<div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
							<TrendingUp className="w-6 h-6 text-muted-foreground" />
						</div>
						<p className="text-muted-foreground font-medium">No recent activities</p>
						<p className="text-xs text-muted-foreground mt-1">Your transactions will appear here</p>
					</div>
				) : (
					<ul className="space-y-2">
						{activities.map((txn) => (
							<li
								key={txn._id}
								className="flex items-center justify-between p-4 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors duration-200 border border-secondary"
							>
								<div className="flex items-center gap-3 flex-1">
									<div className={`w-10 h-10 rounded-lg flex items-center justify-center ${txn.amount >= 0 ? "bg-emerald-500/10" : "bg-rose-500/10"}`}>
										{getTransactionIcon(txn.type)}
									</div>
									<div className="flex-1 min-w-0">
										{role !== "AGENT" && <p className="font-semibold text-sm text-foreground truncate">{ShowTransactionTypeOnOverview(txn.type)}</p>}
										<p className="text-xs text-muted-foreground mt-0.5">{txn.createdAt ? new Date(txn.createdAt).toLocaleString() : "—"}</p>
									</div>
								</div>

								<div
									className={`font-bold text-lg ml-4 ${isPositive(txn.type) ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
								>
									{isPositive(txn.type) ? "+" : "-"}
									{txn.amount.toFixed(2)}
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</Card>
	);
};

export default RecentActivitiesUi;
