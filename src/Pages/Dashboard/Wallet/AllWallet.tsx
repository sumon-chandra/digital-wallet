import { useGetYourWalletQuery } from "@/redux/api/userApi";
import { useLocation } from "react-router-dom";
import { User as UserIcon } from "lucide-react";
import WalletUi from "./WalletUi";
import { useGetAllWalletQuery } from "@/redux/api/adminApi";
import type { Wallet } from "@/types/admin.type";
import TableSkeleton from "@/components/TableSkeleton";
import { useState } from "react";
import Pagination from "@/components/Pagination";

const AllWallet = () => {
	const location = useLocation();
	const [page, setPage] = useState(1);

	const isAdmin = location.pathname.includes("all-wallet");

	const { data: adminData, isLoading: isAdminLoading } = useGetAllWalletQuery({
		page,
		limit: 20,
	});
	const { data: userData, isLoading: isUserLoading } = useGetYourWalletQuery({
		page,
		limit: 20,
	});

	const rawData = isAdmin ? adminData?.data?.data : userData?.data;
	const data: Wallet[] = Array.isArray(rawData) ? rawData : rawData?.data ?? [];
	const meta = isAdmin
		? adminData?.data?.meta ?? { page, limit: 0, total: 0, totalPages: 1 }
		: userData?.data.meta ?? { page, limit: 0, total: 0, totalPages: 1 };

	const isLoading = isAdmin ? isAdminLoading : isUserLoading;

	return (
		<>
			<h2 style={{ color: "var(--card-foreground)" }} className="text-2xl ml-7 font-semibold mb-6">
				{isAdmin ? "All" : "Your"} Wallet
			</h2>

			{isLoading ? (
				<TableSkeleton />
			) : !data || data.length === 0 ? (
				<div className="text-center py-12">
					<UserIcon className="mx-auto h-12 w-12 text-gray-400" />
					<h3 className="mt-2 text-lg font-medium text-black">No Wallet found</h3>
					<p className="mt-1 text-gray-500">There are currently no wallet in your account.</p>
				</div>
			) : (
				<WalletUi data={data} />
			)}
			<Pagination
				page={meta?.page}
				totalPage={meta?.totalPages}
				total={meta?.total}
				canGoPrev={meta?.page > 1}
				canGoNext={meta?.page < meta.totalPages}
				onPrev={() => setPage(Math.max(1, page - 1))}
				onNext={() => setPage(page + 1)}
			/>
		</>
	);
};

export default AllWallet;
