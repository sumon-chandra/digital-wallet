import { useLocation } from "react-router-dom";
import { User as UserIcon } from "lucide-react";
import { useGetAllAgentQuery, useGetAllUserQuery } from "@/redux/api/adminApi";
import { AllUserUi } from "./AllUserUi";
import { TableCell, TableRow } from "@/components/ui/table";

const AllUsers = () => {
	const location = useLocation();

	const isUser = location.pathname.includes("all-users");

	const { data: userData, isLoading: isUserLoading } = useGetAllUserQuery();
	const { data: agentData, isLoading: isAgentLoading } = useGetAllAgentQuery();

	const data = isUser ? userData?.data : agentData?.data;
	const isLoading = isUser ? isUserLoading : isAgentLoading;

	return (
		<>
			{isLoading ? (
				function SkeletonRow() {
					return (
						<TableRow>
							{[...Array(8)].map((_, i) => (
								<TableCell key={i}>
									<div className="h-4 bg-muted rounded animate-pulse" />
								</TableCell>
							))}
						</TableRow>
					);
				}
			) : !data || data.length === 0 ? (
				<div className="text-center py-12">
					<UserIcon className="mx-auto h-12 w-12 text-gray-400" />
					<h3 className="mt-2 text-lg font-medium text-black">No {isUser ? "Users" : "Agents"} found</h3>
					<p style={{ color: "var(--ring)" }}>There are currently no {isUser ? "users" : "agents"} in the system.</p>
				</div>
			) : (
				// <AllUserUi data={data} type={isUser ? "user" : "agent"} />
				<main className="">
					<div className="">
						<div className="mb-8">
							<h1 className="text-3xl font-bold mb-2">{isUser ? "All Users" : "All Agents"} Dashboard</h1>
							<p className="text-muted-foreground">View and manage all users in the system</p>
						</div>
						<AllUserUi data={data} type={isUser ? "user" : "agent"} />
					</div>
				</main>
			)}
		</>
	);
};

export default AllUsers;
