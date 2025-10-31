import { useLocation } from "react-router-dom";
import { User as UserIcon } from "lucide-react";
import { useGetAllAgentQuery, useGetAllUserQuery } from "@/redux/api/adminApi";
import { AllUserUi } from "./AllUserUi";
import TableSkeleton from "@/components/TableSkeleton";
import { useState } from "react";
import Pagination from "@/components/Pagination";

const AllUsers = () => {
	const location = useLocation();
	const [page, setPage] = useState(1);

	const isUser = location.pathname.includes("all-users");

	const { data: userData, isLoading: isUserLoading } = useGetAllUserQuery({
		page,
		limit: 20,
	});
	const { data: agentData, isLoading: isAgentLoading } = useGetAllAgentQuery({
		page,
		limit: 20,
	});

	console.log({
		userData: userData,
		agentData: agentData,
	});

	const data = isUser ? userData?.data?.data : agentData?.data?.data;
	const meta = isUser
		? userData?.data.meta ?? { page, limit: 0, total: 0, totalPages: 1 }
		: agentData?.data.meta ?? { page, limit: 0, total: 0, totalPages: 1 };
	const isLoading = isUser ? isUserLoading : isAgentLoading;

	return (
		<>
			{isLoading ? (
				<TableSkeleton />
			) : !data || data.length === 0 ? (
				<div className="text-center py-12">
					<UserIcon className="mx-auto h-12 w-12 text-gray-400" />
					<h3 className="mt-2 text-lg font-medium text-black">No {isUser ? "Users" : "Agents"} found</h3>
					<p style={{ color: "var(--ring)" }}>There are currently no {isUser ? "users" : "agents"} in the system.</p>
				</div>
			) : (
				// <AllUserUi data={data} type={isUser ? "user" : "agent"} />
				<main className="">
					<div className="mb-8">
						<h1 className="text-3xl font-bold mb-2">{isUser ? "All Users" : "All Agents"} Dashboard</h1>
						<p className="text-muted-foreground">View and manage all users in the system</p>
					</div>
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
				</main>
			)}
		</>
	);
};

export default AllUsers;
