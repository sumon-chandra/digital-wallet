import { Badge } from "@/components/ui/badge";
import { Wallet, RefreshCw, TrendingUp, Copy, Check, Edit } from "lucide-react";
import { useState, type JSX } from "react";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { formatDate, formatTime, getRelativeTime } from "@/utils/dataTime";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useGetMyProfileQuery } from "@/redux/api/userApi";

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
		bg: "bg-primary/10",
		text: "text-primary",
		border: "border-primary/30",
		icon: <TrendingUp className="size-3 mr-1" />,
	},
	INACTIVE: {
		bg: "bg-yellow-600/10",
		text: "text-yellow-700",
		border: "border-yellow-400/30",
		icon: <RefreshCw className="size-3 mr-1" />,
	},
	BLOCKED: {
		bg: "bg-destructive/10",
		text: "text-destructive",
		border: "border-destructive/30",
		icon: <RefreshCw className="size-3 mr-1" />,
	},
};

const WalletUi = ({ data }: WalletUiProps) => {
	const [copiedId, setCopiedId] = useState<string | null>(null);
	const { data: userData } = useGetMyProfileQuery();
	const navigateTo = (param: string) => {
		if (userData?.data.role === "ADMIN") {
			return `/admin/dashboard/${param}`;
		} else if (userData?.data.role === "AGENT") {
			return `/agent/dashboard/${param}`;
		}
	};
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

	const WalletActionOptions = () => {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="sm" className="h-8 w-8 p-0">
						<Edit className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>
						<Link to={navigateTo("add-money-wallet")!}>Add Money</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className="text-destructive hover:text-destructive/80">
						<Link to={navigateTo("block-wallet")!}>Change Wallet Status</Link>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	};

	return (
		<>
			<div className="border border-border rounded-lg overflow-hidden bg-background">
				<Table>
					<TableHeader>
						<TableRow className="bg-accent hover:bg-accent *:font-bold">
							<TableHead>Wallet ID</TableHead>
							<TableHead>User ID</TableHead>
							<TableHead>Balance</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Create Date</TableHead>
							<TableHead>Last Update</TableHead>
							<TableHead>Actions</TableHead>
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
												onClick={() => handleCopyId(wallet._id)}
												className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors group/copy"
												title="Copy User ID"
											>
												<span className="truncate max-w-[80px] font-mono">{wallet._id}</span>
												{copiedId === wallet._id ? (
													<Check className="h-3 w-3 text-primary" />
												) : (
													<Copy className="h-3 w-3 opacity-0 group-hover/copy:opacity-100 transition-opacity" />
												)}
											</button>
										</div>
									</TableCell>
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
									<TableCell className="font-bold">${wallet.balance.toFixed(2)}</TableCell>
									<TableCell>
										<Badge
											variant="secondary"
											className={`flex items-center text-xs uppercase px-3 py-1 rounded-full ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
										>
											{statusConfig.icon}
											{wallet.status}
										</Badge>
									</TableCell>
									<TableCell>
										<div className="flex flex-col justify-end">
											<span className="text-sm text-gray-800 dark:text-gray-200 font-medium">{formatDate(wallet.createdAt)}</span>
											<span className="text-xs text-gray-500 dark:text-gray-400">{formatTime(wallet.createdAt)}</span>
										</div>
									</TableCell>
									<TableCell>
										<div className="flex flex-col justify-end">
											<span className="text-sm text-gray-800 dark:text-gray-200 font-medium">{formatDate(wallet.updatedAt)}</span>
											<span className="text-xs text-gray-500 dark:text-gray-400">{getRelativeTime(wallet.updatedAt)}</span>
										</div>
									</TableCell>
									<TableCell>
										<WalletActionOptions />
									</TableCell>
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
