import QuickActionUi from "./QuickActionUi";
import WalletBalanceUi from "./WalletBalanceUi";
import TotalUserAgent from "./TotalUserAgent";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import {
	useGetAllUserQuery,
	useGetAllAgentQuery,
	useGetAllTransQuery,
	useGetCapitalWalletQuery,
	useGetTransSummeryQuery,
} from "@/redux/api/adminApi";
import type { TRole } from "@/types/auth.type";
import RecentActivitiesUi from "./RecentActivitiesUi";
import { TransactionChart } from "@/components/TransactionChart";
import { useEffect } from "react";

const Overview = () => {
	const { data: userData, isLoading } = useGetMyProfileQuery(undefined);
	const role = userData?.data?.role;
	// console.log("User Role in Overview:", role);
	const sidebarItems = getSidebarItems(role as TRole);

	const quickActions = sidebarItems.flatMap((group) => group.items).filter((item) => item.title !== "Dashboard");

	// Admin Data Fetching
	const { data: allUsers } = useGetAllUserQuery();
	const { data: allAgents } = useGetAllAgentQuery();
	const { data: allTrans, isLoading: isTransLoading } = useGetAllTransQuery({ page: 1, limit: 4 });
	// only fetch transaction summary once we have the user id
	const shouldFetchTransSummary = Boolean(userData?.data?._id);
	console.log("shouldFetchTransSummary:", shouldFetchTransSummary);

	const { data: transSummary, refetch: refetchTransSummary } = useGetTransSummeryQuery({
		startDate: "",
		endDate: "",
	});
	useEffect(() => {
		if (shouldFetchTransSummary) {
			console.log("Fetching transaction summary...");
			refetchTransSummary();
			console.log("transSummary after fetch:", transSummary);
		}
	}, [shouldFetchTransSummary, refetchTransSummary, transSummary]);
	// const { data: transSummary, refetch: refetchTransSummary } = useGetTransSummeryQuery({
	// 	startDate: "",
	// 	endDate: "",
	// 	walletId: "",
	// 	userId: userData?.data?._id,
	// 	role: role,
	// });
	const { data: capitalWallet } = useGetCapitalWalletQuery();

	return (
		<div className="space-y-6">
			{/* Wallet Balance Section */}
			{role !== "ADMIN" && (
				<div>
					<h3 className="text-lg font-semibold">Wallet Balance</h3>
					<WalletBalanceUi balance={userData?.data?.balance || capitalWallet?.data.data[0].balance} loading={isLoading} role={role} />
				</div>
			)}

			{/* Quick Actions Section */}
			<div>
				<h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
				<QuickActionUi actions={quickActions} />
			</div>

			{/* Admin Overview Section */}
			{role === "ADMIN" && (
				<TotalUserAgent
					users={allUsers?.data.data || []}
					agents={allAgents?.data.data || []}
					transactions={allTrans?.data.meta.total || 0}
					totalCommission={allTrans?.data.meta.totalCommission || 0}
					data={undefined}
				/>
			)}

			{/* Recent Transactions Section */}
			<RecentActivitiesUi activities={allTrans?.data?.data || []} loading={isTransLoading} role={role} />
			<TransactionChart chartData={transSummary?.data} loading={isTransLoading} refetchTransSummary={refetchTransSummary} />
		</div>
	);
};

export default Overview;
