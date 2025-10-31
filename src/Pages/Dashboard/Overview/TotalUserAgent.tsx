import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import type { TotalUserAgentProps } from "@/types/overview.type";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TotalUserAgent: React.FC<TotalUserAgentProps> = ({ users, agents, transactions, totalCommission }) => {
	const stats = [
		{ label: "Users", value: users.length, color: "#E60076" },
		{ label: "Agents", value: agents.length, color: "#FF7F50" },
		{ label: "Transactions", value: transactions, color: "#4CAF50" },
		{
			label: "Agents Total Commission",
			value: `$ ${totalCommission}`,
			color: "#2196F3",
		},
	];

	return (
		<Card className="bg-card text-card-foreground shadow-md p-4">
			<CardHeader>
				<CardTitle>Admin Overview</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{/* Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{stats.map((stat) => (
						<Card key={stat.label} className="bg-card text-card-foreground shadow-sm">
							<CardHeader>
								<CardTitle>{stat.label}</CardTitle>
							</CardHeader>
							<CardContent className="text-2xl font-bold">{stat.value}</CardContent>
						</Card>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default TotalUserAgent;
