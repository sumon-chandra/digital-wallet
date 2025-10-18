import { useLocation } from "react-router-dom";
import { Tangent as AgentIcon } from "lucide-react";
import SkeletonCard from "@/components/SkeletonCard";
import { useGetCommissionQuery } from "@/redux/api/agent.api";
import AllCommissionUi from "./AllCommissionUi";
import { useGetAllCommissionQuery } from "@/redux/api/adminApi";
import type { Commission } from "@/types/admin.type";

const AllCommission = () => {
	const location = useLocation();

	const isAdmin = location.pathname.includes("all-agent-com");

	const { data: adminData, isLoading: isAdminLoading } = useGetAllCommissionQuery();
	const { data: AgentData, isLoading: isAgentLoading } = useGetCommissionQuery();

	const rawData = isAdmin ? adminData?.data?.data : AgentData?.data;
	const data: Commission[] = Array.isArray(rawData) //! Here is the converter
		? rawData
		: rawData?.data ?? [];

	const isLoading = isAdmin ? isAdminLoading : isAgentLoading;

	return (
		<>
			<h2 className="text-2xl font-semibold mb-6">{isAdmin ? "Admin all" : "Your all"} Commission</h2>

			{isLoading ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{[...Array(6)].map((_, i) => (
						<SkeletonCard key={i} />
					))}
				</div>
			) : !data || data.length === 0 ? (
				<div className="text-center py-12">
					<AgentIcon className="mx-auto h-12 w-12 text-gray-400" />
					<h3 className="mt-2 text-lg font-medium text-black">No Commission found</h3>
					<p className="mt-1 text-gray-500">There are currently no commission in your account.</p>
				</div>
			) : (
				<AllCommissionUi data={data} />
			)}
		</>
	);
};

export default AllCommission;
