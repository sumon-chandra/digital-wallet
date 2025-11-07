import { UserFilterPanel } from "@/components/UserFilterPanel";

interface Props {
	isUser: boolean;
	handleFilterChange: () => void;
}

const UserListHeader = ({ isUser, handleFilterChange }: Props) => {
	return (
		<>
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-2">{isUser ? "All Users" : "All Agents"} Dashboard</h1>
				<p className="text-muted-foreground">View and manage all users in the system</p>
			</div>
			<UserFilterPanel onFilterChange={handleFilterChange} />
		</>
	);
};

export default UserListHeader;
