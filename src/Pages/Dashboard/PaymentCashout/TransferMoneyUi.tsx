import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import Pagination from "@/components/Pagination";
import type { Props } from "@/types/TransferMoneyUi.type";

const TransferMoneyUi: React.FC<Props> = ({
	search,
	setSearch,
	limit,
	setLimit,
	users,
	isFetching,
	isError,
	meta,
	page,
	setPage,
	selectedUser,
	amount,
	setAmount,
	openSendDialog,
	closeSendDialog,
	handleConfirmTransfer,
	isTransferLoading,
}) => {
	return (
		<div className="space-y-4">
			{/* Top Bar */}
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex items-center gap-2 w-full sm:w-1/2">
					<Input placeholder="Search by email, phone, or name..." value={search} onChange={(e) => setSearch(e.target.value)} />
				</div>

				<div className="flex items-center gap-3">
					<div className="flex items-center gap-2">
						<Label htmlFor="limit">Rows</Label>
						<Select
							value={String(limit)}
							onValueChange={(v) => {
								setPage(1);
								setLimit(Number(v));
							}}
						>
							<SelectTrigger id="limit" className="w-[90px]">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="5">5</SelectItem>
								<SelectItem value="10">10</SelectItem>
								<SelectItem value="20">20</SelectItem>
								<SelectItem value="50">50</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>

			{/* Table */}
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Phone</TableHead>
							<TableHead className="text-right">Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isFetching ? (
							<TableRow>
								<TableCell colSpan={4} className="text-center">
									<div className="flex items-center justify-center gap-2 py-6">
										<Loader2 className="h-5 w-5 animate-spin" />
										<span>Loading users…</span>
									</div>
								</TableCell>
							</TableRow>
						) : isError ? (
							<TableRow>
								<TableCell colSpan={4} className="text-center text-destructive py-6">
									Failed to load users
								</TableCell>
							</TableRow>
						) : users.length ? (
							users.map((u) => (
								<TableRow key={u._id}>
									<TableCell className="text-foreground">{u.name}</TableCell>
									<TableCell className="text-foreground">{u.email}</TableCell>
									<TableCell className="text-foreground">{u.phone}</TableCell>
									<TableCell className="text-right">
										<Button size="sm" onClick={() => openSendDialog(u)}>
											Send
										</Button>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={4} className="text-center py-6">
									No users found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{/* Pagination */}
			<Pagination
				page={meta.page}
				totalPage={meta.totalPage}
				total={meta.total}
				canGoPrev={meta.page > 1}
				canGoNext={meta.page < meta.totalPage}
				onPrev={() => setPage(Math.max(1, page - 1))}
				onNext={() => setPage(page + 1)}
			/>

			{/* Send Money Dialog */}
			<Dialog open={!!selectedUser} onOpenChange={(open) => (!open ? closeSendDialog() : null)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Send money</DialogTitle>
					</DialogHeader>
					<div className="grid gap-5">
						<div className="text-sm text-muted-foreground">
							To: <span className="font-medium text-foreground">{selectedUser?.email}</span>{" "}
							<div className="flex flex-col">
								<span className="opacity-80 mt-0.5 text-foreground">Name: {selectedUser?.name}</span>
								<span className="opacity-80 mt-0.5 text-foreground">Phone: {selectedUser?.phone}</span>
							</div>
						</div>
						<div className="grid gap-2">
							<Label className="mb-2" htmlFor="amount">
								Amount
							</Label>
							<Input id="amount" type="number" inputMode="decimal" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} min={0} />
						</div>
					</div>
					<DialogFooter>
						<Button variant="ghost" onClick={closeSendDialog}>
							Cancel
						</Button>
						<Button onClick={handleConfirmTransfer} disabled={isTransferLoading}>
							{isTransferLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default TransferMoneyUi;
