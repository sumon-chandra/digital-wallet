import { useLocation, useSearchParams } from "react-router-dom";
import { useGetAllAgentQuery, useGetAllUserQuery } from "@/redux/api/adminApi";
import TableSkeleton from "@/components/TableSkeleton";
import { useState, useMemo } from "react";
import Pagination from "@/components/Pagination";
import { type FilterParams } from "@/components/UserFilterPanel";
import { AllUserUi } from "./AllUserUi";
import UserListHeader from "./UserListHeader";
import { UserNotFound } from "./UserNotFound";

const AllUsers = () => {
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const [page, setPage] = useState(1);

	const isUser = location.pathname.includes("all-users");

	const filters: FilterParams = useMemo(
		() => ({
			search: searchParams.get("search") || "",
			status: searchParams.get("status") || "",
			emailVerified: searchParams.get("emailVerified") || "",
		}),
		[searchParams]
	);

	const { data: userData, isLoading: isUserLoading } = useGetAllUserQuery({
		page,
		limit: 20,
		search: filters.search || undefined,
		status: filters.status || undefined,
		emailVerified: filters.emailVerified || undefined,
	});

	const { data: agentData, isLoading: isAgentLoading } = useGetAllAgentQuery({
		page,
		limit: 20,
		search: filters.search || undefined,
		status: filters.status || undefined,
	});

	const data = isUser ? userData?.data?.data : agentData?.data?.data;
	const meta = isUser
		? userData?.data.meta ?? { page, limit: 0, total: 0, totalPages: 1 }
		: agentData?.data.meta ?? { page, limit: 0, total: 0, totalPages: 1 };
	const isLoading = isUser ? isUserLoading : isAgentLoading;

	const handleFilterChange = () => {
		setPage(1);
	};

	return (
		<main>
			<UserListHeader handleFilterChange={handleFilterChange} isUser />
			{isLoading ? (
				<TableSkeleton />
			) : !data ? (
				<UserNotFound isUser />
			) : (
				<>
					<AllUserUi data={data} type={isUser ? "user" : "agent"} />
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
			)}
		</main>
	);
};

export default AllUsers;
