import { Skeleton } from "@/components/ui/skeleton";

export function TransactionSkeleton() {
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
						{Array.from({ length: 5 }).map((_, i) => (
							<tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
								{/* Type Column */}
								<td className="px-6 py-4">
									<div className="flex items-center gap-3">
										<Skeleton className="h-4 w-4 rounded" />
										<Skeleton className="h-4 w-24" />
									</div>
								</td>

								{/* Amount Column */}
								<td className="px-6 py-4">
									<Skeleton className="h-4 w-20" />
								</td>

								{/* Status Column */}
								<td className="px-6 py-4">
									<Skeleton className="h-6 w-16 rounded-full" />
								</td>

								{/* Date Column */}
								<td className="px-6 py-4">
									<div className="space-y-2">
										<Skeleton className="h-4 w-24" />
										<Skeleton className="h-3 w-20" />
									</div>
								</td>

								{/* Transaction ID Column */}
								<td className="px-6 py-4">
									<Skeleton className="h-8 w-32" />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
