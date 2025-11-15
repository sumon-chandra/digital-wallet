import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { TransSummeryReportType } from "@/types/api-response";
import { LoaderPinwheel } from "lucide-react";

interface TransactionChartProps {
	chartData: TransSummeryReportType[] | undefined;
	loading: boolean;
	refetchTransSummary?: () => void;
}

export const description = "Transactions summary over time";

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
	CashIn: {
		label: "Cash In",
		color: "var(--chart-1)",
	},
	CashOut: {
		label: "Cash Out",
		color: "var(--chart-2)",
	},
	SendMoney: {
		label: "Send Money",
		color: "var(--chart-3)",
	},
	ReceiveMoney: {
		label: "Receive Money",
		color: "var(--chart-4)",
	},
	TopUp: {
		label: "Top Up",
		color: "var(--chart-5)",
	},
	Withdraw: {
		label: "Withdraw",
		color: "var(--chart-6)",
	},
};

export function TransactionChart({ chartData, loading }: TransactionChartProps) {
	const [timeRange, setTimeRange] = React.useState("30d");
	// console.log("chartData:", chartData);

	const filteredData = chartData?.filter((item) => {
		const date = new Date(item.date);
		const referenceDate = new Date("2024-06-30");
		let daysToSubtract = 30;
		if (timeRange === "15d") {
			daysToSubtract = 15;
		} else if (timeRange === "7d") {
			daysToSubtract = 7;
		}
		const startDate = new Date(referenceDate);
		startDate.setDate(startDate.getDate() - daysToSubtract);
		return date >= startDate;
	});

	return (
		<Card className="pt-0">
			<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
				<div className="grid flex-1 gap-1">
					<CardTitle>Transaction Summary</CardTitle>
					<CardDescription>Showing total transactions for the last 30 days</CardDescription>
				</div>
				<Select value={timeRange} onValueChange={setTimeRange}>
					<SelectTrigger className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex" aria-label="Select a value">
						<SelectValue placeholder="Last 30 days" />
					</SelectTrigger>
					<SelectContent className="rounded-xl">
						<SelectItem value="30d" className="rounded-lg">
							Last 30 days
						</SelectItem>
						<SelectItem value="15d" className="rounded-lg">
							Last 15 days
						</SelectItem>
						<SelectItem value="7d" className="rounded-lg">
							Last 7 days
						</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				{loading ? (
					<LoaderPinwheel />
				) : (
					<ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
						<AreaChart data={filteredData}>
							<defs>
								<linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
									<stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
								</linearGradient>
								<linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
									<stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
								</linearGradient>
							</defs>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="date"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								minTickGap={32}
								tickFormatter={(value) => {
									const date = new Date(value);
									return date.toLocaleDateString("en-US", {
										month: "short",
										day: "numeric",
									});
								}}
							/>
							<ChartTooltip
								cursor={false}
								content={
									<ChartTooltipContent
										labelFormatter={(value) => {
											return new Date(value).toLocaleDateString("en-US", {
												month: "short",
												day: "numeric",
											});
										}}
										indicator="dot"
									/>
								}
							/>
							{/* <Area dataKey="mobile" type="natural" fill="url(#fillMobile)" stroke="var(--color-mobile)" stackId="a" />
							<Area dataKey="desktop" type="natural" fill="url(#fillDesktop)" stroke="var(--color-desktop)" stackId="a" /> */}
							<Area dataKey="cashIn" type="natural" fill="var(--chart-1)" stroke="var(--chart-1)" stackId="a" />
							<Area dataKey="cashOut" type="natural" fill="var(--chart-2)" stroke="var(--chart-2)" stackId="a" />
							<Area dataKey="sendMoney" type="natural" fill="var(--chart-3)" stroke="var(--chart-3)" stackId="a" />
							<Area dataKey="receiveMoney" type="natural" fill="var(--chart-4)" stroke="var(--chart-4)" stackId="a" />
							<Area dataKey="topUp" type="natural" fill="var(--chart-5)" stroke="var(--chart-5)" stackId="a" />
							<Area dataKey="withdraw" type="natural" fill="var(--chart-6)" stroke="var(--chart-6)" stackId="a" />
							<ChartLegend content={<ChartLegendContent />} />
						</AreaChart>
					</ChartContainer>
				)}
			</CardContent>
		</Card>
	);
}
