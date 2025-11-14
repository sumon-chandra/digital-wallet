import React from "react";
import { Card, CardTitle } from "@/components/ui/card";
import type { RecentActivitiesUiProps } from "@/types/overview.type";
import { TrendingUp } from "lucide-react";
import type { TransactionType } from "@/types/admin.type";
import TransactionList from "@/components/TransactionList";

const RecentActivitiesUi: React.FC<RecentActivitiesUiProps> = ({ activities = [], loading, role }) => {
	const isPositive = (type: TransactionType) => {
		if (type === "TOP_UP" || type === "RECEIVE_MONEY" || type === "CASH_IN") {
			return role === "AGENT" ? false : true;
		}
		return role === "AGENT" ? true : false;
	};

	return (
		<Card className="p-0 rounded-2xl shadow-md overflow-hidden border-0">
			<div className="px-6 py-5 border-b border-border bg-gradient-to-r from-card to-card">
				<CardTitle className="text-lg font-semibold text-foreground">{role === "ADMIN" ? "All Recent Transactions" : "Recent Transactions"}</CardTitle>
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
							<TransactionList key={txn._id} isPositive={isPositive} txn={txn} />
						))}
					</ul>
				)}
			</div>
		</Card>
	);
};

export default RecentActivitiesUi;
