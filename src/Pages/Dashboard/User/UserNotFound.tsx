import { UserIcon } from "lucide-react";

interface Props {
	isUser: boolean;
}
export const UserNotFound = ({ isUser }: Props) => {
	return (
		<div className="text-center py-12">
			<UserIcon className="mx-auto h-12 w-12 text-gray-400" />
			<h3 className="mt-2 text-lg font-medium text-black">No {isUser ? "Users" : "Agents"} found</h3>
			<p style={{ color: "var(--ring)" }}>There are currently no {isUser ? "users" : "agents"} in the system.</p>
		</div>
	);
};
