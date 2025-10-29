/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Wallet, RefreshCw, TrendingUp, Copy, Check } from "lucide-react";
import { useState, type JSX } from "react";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { formatDate } from "@/utils/dataTime";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface WalletData {
	_id: string;
	balance: number;
	userId: string;
	status: "ACTIVE" | "INACTIVE" | string;
	createdAt: string;
	updatedAt: string;
}

interface WalletUiProps {
	data: WalletData[];
}

const statusColors: Record<string, { bg: string; text: string; border: string; icon: JSX.Element }> = {
	ACTIVE: {
		bg: "bg-green-100",
		text: "text-green-800",
		border: "border-green-200",
		icon: <TrendingUp className="h-3 w-3 mr-1" />,
	},
	INACTIVE: {
		bg: "bg-red-100",
		text: "text-red-800",
		border: "border-red-200",
		icon: <RefreshCw className="h-3 w-3 mr-1" />,
	},
	DEFAULT: {
		bg: "bg-gray-100",
		text: "text-gray-800",
		border: "border-gray-200",
		icon: <RefreshCw className="h-3 w-3 mr-1" />,
	},
};

const WalletUi = ({ data }: WalletUiProps) => {
	const [copiedId, setCopiedId] = useState<string | null>(null);

	const handleCopyId = async (id: string) => {
		const success = await copyToClipboard(id);
		if (success) {
			setCopiedId(id);
		}
	};

	if (!data || data.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-12 px-4 dark:text-gray-400">
				<div className="bg-gradient-to-br from-accent to-accent dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl text-center max-w-md shadow-lg">
					<Wallet className="h-16 w-16 text-primary dark:text-gray-500 mx-auto mb-4" />
					<h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">No Wallets Found</h3>
					<p className="text-gray-500 dark:text-gray-400">Wallet data will appear here once available.</p>
				</div>
			</div>
		);
	}

	return (
		<>
			{/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6">
				{data.map((wallet) => {
					const statusConfig = statusColors[wallet.status] || statusColors.DEFAULT;

					return (
						<Card
							key={wallet._id}
							className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-0 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group relative dark:border-gray-700"
						>
							<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-primary"></div>

							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 pt-5 px-5 border-b border-gray-100 dark:border-gray-800">
								<div className="flex items-center gap-2">
									<div className="p-2 bg-accent dark:bg-primary/40 rounded-lg">
										<Wallet className="h-5 w-5 text-primary dark:text-primary" />
									</div>
									<CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">Wallet</CardTitle>
								</div>

								<Badge
									variant="secondary"
									className={`flex items-center text-xs uppercase px-3 py-1 rounded-full ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
								>
									{statusConfig.icon}
									{wallet.status}
								</Badge>
							</CardHeader>

							<CardContent className="pt-6 px-5 pb-5">
								<div className="space-y-4">
									<div className="bg-secondary/30 p-4 rounded-xl border border-accent">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2 font-medium">
												<Wallet className="h-4 w-4" />
												Balance
											</div>
											<span className="text-2xl font-bold">${wallet.balance.toFixed(2)}</span>
										</div>
									</div>

									<div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg group-hover:bg-secondary/30 dark:group-hover:bg-primary/50 transition-colors">
										<div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
											<User className="h-4 w-4 text-primary" />
											<span className="text-sm font-medium">User ID</span>
										</div>
										<button
											onClick={() => handleCopyId(wallet.userId)}
											className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors group/copy"
											title="Copy User ID"
										>
											<span className="truncate max-w-[80px] font-mono">{wallet.userId}</span>
											{copiedId === wallet.userId ? (
												<Check className="h-3 w-3 text-primary" />
											) : (
												<Copy className="h-3 w-3 opacity-0 group-hover/copy:opacity-100 transition-opacity" />
											)}
										</button>
									</div>

									<div className="grid grid-cols-2 gap-3">
										<div className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg group-hover:bg-secondary/30 dark:group-hover:bg-primary/50 transition-colors">
											<div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-1">
												<Calendar className="h-4 w-4 text-primary" />
												<span className="text-xs font-medium">Created</span>
											</div>
											<span className="text-sm text-gray-800 dark:text-gray-200 font-medium">{formatDate(wallet.createdAt)}</span>
											<span className="text-xs text-gray-500 dark:text-gray-400">{formatTime(wallet.createdAt)}</span>
										</div>

										<div className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg group-hover:bg-secondary/30 dark:group-hover:bg-primary/50 transition-colors">
											<div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-1">
												<Clock className="h-4 w-4 text-primary" />
												<span className="text-xs font-medium">Updated</span>
											</div>
											<span className="text-sm text-gray-800 dark:text-gray-200 font-medium">{formatDate(wallet.updatedAt)}</span>
											<span className="text-xs text-gray-500 dark:text-gray-400">{getRelativeTime(wallet.updatedAt)}</span>
										</div>
									</div>
								</div>
							</CardContent>

							<div className="absolute inset-0 bg-gradient-to-b from-accent/0 to-primary/0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10"></div>
						</Card>
					);
				})}
			</div> */}
			<div className="border border-border rounded-lg overflow-hidden bg-background">
				<Table>
					<TableHeader>
						<TableRow className="bg-accent hover:bg-accent *:font-bold">
							<TableHead>User ID</TableHead>
							<TableHead>Balance</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Created At</TableHead>
							<TableHead>Updated At</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.map((wallet) => {
							const statusConfig = statusColors[wallet.status] || statusColors.DEFAULT;

							return (
								<TableRow key={wallet._id} className="hover:bg-accent/50 transition-colors">
									<TableCell>
										<div className="flex items-center gap-2">
											<button
												onClick={() => handleCopyId(wallet.userId)}
												className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors group/copy"
												title="Copy User ID"
											>
												<span className="truncate max-w-[80px] font-mono">{wallet.userId}</span>
												{copiedId === wallet.userId ? (
													<Check className="h-3 w-3 text-primary" />
												) : (
													<Copy className="h-3 w-3 opacity-0 group-hover/copy:opacity-100 transition-opacity" />
												)}
											</button>
										</div>
									</TableCell>
									<TableCell>${wallet.balance.toFixed(2)}</TableCell>
									<TableCell>
										<Badge
											variant="secondary"
											className={`flex items-center text-xs uppercase px-3 py-1 rounded-full ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
										>
											{statusConfig.icon}
											{wallet.status}
										</Badge>
									</TableCell>
									<TableCell>{formatDate(wallet.createdAt)}</TableCell>
									<TableCell>{formatDate(wallet.updatedAt)}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>
		</>
	);
};

export default WalletUi;
