import { useState } from "react";
// import type { User } from "@/types/admin.type";
import { Mail, Phone, MapPin, Shield, CheckCircle, XCircle, Copy, Check, MoreHorizontal } from "lucide-react";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { IsActive, IUserResponse } from "@/types/user.type";
import { Link } from "react-router-dom";

interface AllUserUiProps<T> {
	data?: T[];
	type: "user" | "agent";
	loading?: boolean;
}

function SkeletonRow() {
	return (
		<TableRow>
			{[...Array(8)].map((_, i) => (
				<TableCell key={i}>
					<div className="h-4 bg-muted rounded animate-pulse" />
				</TableCell>
			))}
		</TableRow>
	);
}

function StatusBadge({ isActive, isVerified }: { isActive: IsActive; isVerified: boolean }) {
	return (
		<div className="flex items-center gap-3">
			<div className="flex items-center gap-1">
				<div className={`p-1 rounded-full ${isActive === "ACTIVE" ? "bg-green-100" : "bg-red-100"}`}>
					<Shield className={`h-3.5 w-3.5 ${isActive === "ACTIVE" ? "text-green-600" : "text-red-600"}`} />
				</div>
				<span className={`text-xs font-medium ${isActive === "ACTIVE" ? "text-green-700" : "text-red-700"}`}>{isActive}</span>
			</div>
			<div className="flex items-center gap-1">
				<div className={`p-1 rounded-full ${isVerified ? "bg-green-100" : "bg-red-100"}`}>
					{isVerified ? <CheckCircle className="h-3.5 w-3.5 text-green-600" /> : <XCircle className="h-3.5 w-3.5 text-red-600" />}
				</div>
				<span className={`text-xs font-medium ${isVerified ? "text-green-700" : "text-red-700"}`}>{isVerified ? "Verified" : "Pending"}</span>
			</div>
		</div>
	);
}

function ActionMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm" className="h-8 w-8 p-0">
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem>View Profile</DropdownMenuItem>
				<DropdownMenuItem>Reset Password</DropdownMenuItem>
				<DropdownMenuItem>
					<Link to={`/admin/dashboard/update-user-status`}>Change Status</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link to={`/admin/dashboard/update-user-role`}>Change Role</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export function AllUserUi<T extends IUserResponse>({ data }: AllUserUiProps<T>) {
	// console.log(data);
	const [copiedId, setCopiedId] = useState<string | null>(null);

	const handleCopyId = async (id: string) => {
		const success = await copyToClipboard(id);
		if (success) {
			setCopiedId(id);
			toast.success("ID copied successfully!", { duration: 2000 });
		} else {
			console.error("Failed to copy ID to clipboard");
		}
	};

	if (!data) {
		return (
			<div className="border border-border rounded-lg overflow-hidden">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Phone</TableHead>
							<TableHead>Address</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>ID</TableHead>
							<TableHead className="w-10">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{[...Array(8)].map((_, i) => (
							<SkeletonRow key={i} />
						))}
					</TableBody>
				</Table>
			</div>
		);
	}

	if (data.length === 0) {
		return (
			<div className="border border-border rounded-lg overflow-hidden p-8 text-center">
				<p className="text-muted-foreground">No users found</p>
			</div>
		);
	}

	return (
		<div className="border border-border rounded-lg overflow-hidden bg-background">
			<Table>
				<TableHeader>
					<TableRow className="bg-accent hover:bg-accent *:font-bold">
						<TableHead>Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>ID</TableHead>
						<TableHead>Phone</TableHead>
						<TableHead>Address</TableHead>
						<TableHead>Total Transactions</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="w-10">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((item) => (
						<TableRow key={item.id} className="hover:bg-accent/50 transition-colors">
							<TableCell className="font-medium">{item.name}</TableCell>
							<TableCell>
								<div className="flex items-center gap-2">
									<Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
									<span className="truncate">{item.email}</span>
								</div>
							</TableCell>
							<TableCell>
								<button
									onClick={() => handleCopyId(item.id!)}
									className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors group"
									title="Copy ID"
								>
									<span className="truncate max-w-[80px]">{item.id}...</span>
									<div className="opacity-0 group-hover:opacity-100 transition-opacity">
										{copiedId === item.id ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
									</div>
								</button>
							</TableCell>
							<TableCell>
								<div className="flex items-center gap-2">
									<Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
									<span>{item.phone || "Not provided"}</span>
								</div>
							</TableCell>
							<TableCell>
								<div className="flex items-center gap-2">
									<MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
									<span className="truncate">{item.address || "Not provided"}</span>
								</div>
							</TableCell>
							<TableCell>
								<span className="font-bold">{item.transactionCount}</span>
							</TableCell>
							<TableCell>
								<StatusBadge isActive={item.status} isVerified={item.isEmailVerified} />
							</TableCell>
							<TableCell>
								<ActionMenu />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
