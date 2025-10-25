import { useState } from "react";
import { useGetYourTransQuery } from "@/redux/api/userApi";
import { useGetAllTransQuery } from "@/redux/api/adminApi";
import { useLocation } from "react-router-dom";
// import SkeletonCard from "@/components/SkeletonCard";
import TransactionUi from "./TransactionUi";
import type { ITransaction } from "@/types/admin.type";
import { User as UserIcon } from "lucide-react";
import TransactionFilter from "@/components/TransactionFilter";
import Pagination from "@/components/Pagination";
import { TransactionSkeleton } from "./TransactionSkeleton";

const AllTrans = () => {
	const location = useLocation();
	const isAdmin = location.pathname.includes("all-trans");
	const [filters, setFilters] = useState<{
		type?: string;
		startDate?: string;
		endDate?: string;
	}>({});
	const [page, setPage] = useState(1);
	const limit = 20;

	const { data: adminData, isFetching: isAdminFetching } = useGetAllTransQuery({
		page,
		limit,
		...filters,
	});
	const { data: userData, isFetching: isUserFetching } = useGetYourTransQuery({
		page,
		limit,
		...filters,
	});

	const rawData = isAdmin ? adminData?.data?.data : userData?.data;
	const data: ITransaction[] = Array.isArray(rawData) ? rawData : rawData?.data ?? [];
	const meta = isAdmin
		? adminData?.data?.meta ?? { page, limit, total: 0, totalPages: 1 }
		: userData?.data.meta ?? { page, limit, total: 0, totalPages: 1 };
	const isFetching = isAdmin ? isAdminFetching : isUserFetching;
	// console.log({ data, meta });
	return (
		<>
			<h2 style={{ color: "var(--card-foreground)" }} className="text-2xl ml-7 font-semibold mb-6">
				{isAdmin ? "Admin all" : "Your all"} Transaction
			</h2>
			<TransactionFilter onFilter={setFilters} />
			<div className="flex flex-col max-h-max">
				<div className="">
					{/* Transactions grid */}
					{isFetching ? (
						[...Array(6)].map((_, i) => <TransactionSkeleton key={i} />)
					) : !data || data.length === 0 ? (
						<div className="text-center py-12">
							<UserIcon style={{ color: "var(--card-foreground)" }} className="mx-auto h-12 w-12" />
							<h3 className="mt-2 text-lg font-medium text-black">No Transaction found</h3>
							<p style={{ color: "var(--card-foreground)" }} className="mt-1">
								There are currently no transaction in your account.
							</p>
						</div>
					) : (
						<TransactionUi data={data} />
					)}
				</div>

				<div className="mt-10">
					<Pagination
						page={meta?.page}
						totalPage={meta?.totalPages}
						total={meta?.total}
						canGoPrev={meta?.page > 1}
						canGoNext={meta?.page < meta.totalPages}
						onPrev={() => setPage(Math.max(1, page - 1))}
						onNext={() => setPage(page + 1)}
					/>
				</div>
			</div>
		</>
	);
};

export default AllTrans;
