import { useGetYourWalletQuery } from "@/redux/api/userApi";
import { useLocation } from "react-router-dom";
import { User as UserIcon } from "lucide-react";
import SkeletonCard from "@/components/SkeletonCard";
import WalletUi from "./WalletUi";
import { useGetAllWalletQuery } from "@/redux/api/adminApi";
import type { Wallet } from "@/types/admin.type";

const AllWallet = () => {
	const location = useLocation();

	const isAdmin = location.pathname.includes("all-wallet");

	const { data: adminData, isLoading: isAdminLoading } = useGetAllWalletQuery();
	const { data: userData, isLoading: isUserLoading } = useGetYourWalletQuery();

	const rawData = isAdmin ? adminData?.data?.data : userData?.data;
	const data: Wallet[] = Array.isArray(rawData) //! Here is the converter
		? rawData
		: rawData?.data ?? [];

	const isLoading = isAdmin ? isAdminLoading : isUserLoading;

	return (
		<>
			<h2 style={{ color: "var(--card-foreground)" }} className="text-2xl ml-7 font-semibold mb-6">
				{isAdmin ? "All" : "Your"} Wallet
			</h2>

			{isLoading ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{[...Array(6)].map((_, i) => (
						<SkeletonCard key={i} />
					))}
				</div>
			) : !data || data.length === 0 ? (
				<div className="text-center py-12">
					<UserIcon className="mx-auto h-12 w-12 text-gray-400" />
					<h3 className="mt-2 text-lg font-medium text-black">No Wallet found</h3>
					<p className="mt-1 text-gray-500">There are currently no wallet in your account.</p>
				</div>
			) : (
				<WalletUi data={data} />
			)}
		</>
	);
};

export default AllWallet;
