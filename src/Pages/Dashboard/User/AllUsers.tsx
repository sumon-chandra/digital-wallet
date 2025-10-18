import AllUserUi from "./AllUserUi";
import { useLocation } from "react-router-dom";
import { User as UserIcon } from "lucide-react";
import SkeletonCard from "@/components/SkeletonCard";
import { useGetAllAgentQuery, useGetAllUserQuery } from "@/redux/api/adminApi";

const AllUsers = () => {
	const location = useLocation();

	const isUser = location.pathname.includes("all-users");

	const { data: userData, isLoading: isUserLoading } = useGetAllUserQuery();
	const { data: agentData, isLoading: isAgentLoading } = useGetAllAgentQuery();

	const data = isUser ? userData?.data : agentData?.data;
	const isLoading = isUser ? isUserLoading : isAgentLoading;

	return (
		<>
			<h2 style={{ color: "var(--card-foreground)" }} className="text-2xl ml-2 font-semibold mb-6">
				{isUser ? "All Users" : "All Agents"} Dashboard
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
					<h3 className="mt-2 text-lg font-medium text-black">No {isUser ? "Users" : "Agents"} found</h3>
					<p style={{ color: "var(--ring)" }}>There are currently no {isUser ? "users" : "agents"} in the system.</p>
				</div>
			) : (
				<AllUserUi data={data} type={isUser ? "user" : "agent"} />
			)}
		</>
	);
};

export default AllUsers;
