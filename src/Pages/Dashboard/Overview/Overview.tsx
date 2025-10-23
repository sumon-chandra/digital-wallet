import QuickActionUi from "./QuickActionUi";
import WalletBalanceUi from "./WalletBalanceUi";
import TotalUserAgent from "./TotalUserAgent";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { useGetMyProfileQuery, useGetYourWalletQuery } from "@/redux/api/userApi";
import { useGetAllUserQuery, useGetAllAgentQuery, useGetAllTransQuery, useGetCapitalWalletQuery } from "@/redux/api/adminApi";
import type { TRole } from "@/types/auth.type";
import RecentActivitiesUi from "./RecentActivitiesUi";

const Overview = () => {
	const { data: userData } = useGetMyProfileQuery(undefined);
	const { data: walletData, isLoading: isWalletLoading } = useGetYourWalletQuery(undefined);
	const role = userData?.data?.role;
	const sidebarItems = getSidebarItems(role as TRole);

	const quickActions = sidebarItems.flatMap((group) => group.items).filter((item) => item.title !== "Dashboard");

	// Admin Data Fetching
	const { data: allUsers } = useGetAllUserQuery();
	const { data: allAgents } = useGetAllAgentQuery();
	const { data: allTrans, isLoading: isTransLoading } = useGetAllTransQuery({ page: 1, limit: 4 });
	const { data: capitalWallet } = useGetCapitalWalletQuery();

	return (
		<div className="space-y-6">
			{/* Wallet Balance Section */}
			{role !== "ADMIN" && (
				<div>
					<h3 className="text-lg font-semibold">Wallet Balance</h3>
					<WalletBalanceUi balance={walletData?.data?.data[0]?.balance || capitalWallet?.data.data[0].balance} loading={isWalletLoading} role={role} />
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
					users={allUsers?.data || []}
					agents={allAgents?.data || []}
					transactions={allTrans?.data.meta.total || 0}
					totalCommission={allTrans?.data.meta.totalCommission || 0}
					data={undefined}
				/>
			)}

			{/* Recent Transactions Section */}
			<RecentActivitiesUi activities={allTrans?.data?.data || []} loading={isTransLoading} role={role} />
		</div>
	);
};

export default Overview;
