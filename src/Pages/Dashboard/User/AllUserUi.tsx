import { useState } from "react";
import SkeletonCard from "@/components/SkeletonCard";
import type { User } from "@/types/admin.type";
import { Mail, Phone, MapPin, Shield, CheckCircle, XCircle, User as UserIcon, IdCard, Copy, Check } from "lucide-react";
import { copyToClipboard } from "@/utils/copyToClipboard";

interface AllUserUiProps<T> {
	data?: T[];
	type: "user" | "agent";
	loading?: boolean;
}

// Toast component for showing notifications
const Toast = ({ message, show }: { message: string; show: boolean }) => {
	return (
		<div
			className={`fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 ${
				show ? "opacity-100" : "opacity-0 pointer-events-none"
			}`}
		>
			<div className="flex items-center">
				<Check className="h-5 w-5 mr-2" />
				<span>{message}</span>
			</div>
		</div>
	);
};

function AllUserUi<T extends User>({ data }: AllUserUiProps<T>) {
	const [copiedId, setCopiedId] = useState<string | null>(null);
	const [showToast, setShowToast] = useState(false);

	const handleCopyId = async (id: string) => {
		const success = await copyToClipboard(id);
		if (success) {
			setCopiedId(id);
			setShowToast(true);
			setTimeout(() => setShowToast(false), 3000);
		} else {
			console.error("Failed to copy ID to clipboard");
		}
	};

	if (!data || data.length === 0) {
		return (
			<>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{[...Array(8)].map((_, i) => (
						<SkeletonCard key={i} />
					))}
				</div>
				<Toast message="ID copied successfully!" show={showToast} />
			</>
		);
	}

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{data.map((item) => (
					<div
						key={item._id}
						className="relative border border-border p-5 rounded-xl bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group overflow-hidden"
					>
						{/* Accent bar */}
						<div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>

						{/* Header */}
						<div className="flex items-start justify-between mb-4">
							<div className="flex items-center gap-2">
								<div className="p-2 bg-secondary rounded-full">
									<UserIcon className="h-5 w-5 text-primary" />
								</div>
								<div>
									<h3 className="font-bold truncate max-w-[120px]">{item.name}</h3>
									<div className="flex items-center mt-1">
										<button
											onClick={() => handleCopyId(item._id)}
											className="flex items-center text-xs text-muted-foreground hover:text-primary transition-colors group/copy"
											title="Copy ID"
										>
											<IdCard className="h-3 w-3 mr-1" />
											<span className="truncate max-w-[80px]">ID: {item._id}</span>
											<div className="ml-1 opacity-0 group-hover/copy:opacity-100 transition-opacity">
												{copiedId === item._id ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
											</div>
										</button>
									</div>
								</div>
							</div>

							<span
								className={`px-2 py-1 rounded-full text-xs font-semibold border ${
									item.role === "admin"
										? "bg-purple-100 text-purple-700 border-purple-200"
										: item.role === "agent"
										? "bg-blue-100 text-blue-700 border-blue-200"
										: "bg-secondary text-secondary-foreground border-border"
								}`}
							>
								{item.role}
							</span>
						</div>

						{/* Details */}
						<div className="space-y-3">
							<div className="flex items-center p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
								<Mail className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
								<span className="truncate text-sm">{item.email}</span>
							</div>

							<div className="flex items-center p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
								<Phone className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
								<span className="text-sm">{item.phone || "Not provided"} </span>
							</div>

							<div className="flex items-center p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
								<MapPin className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
								<span className="truncate text-sm">{item.address || "Not provided"}</span>
							</div>

							{/* Status */}
							<div className="pt-3 border-t border-border">
								<div className="flex items-center justify-between">
									<div className="flex items-center text-sm">
										<div className={`p-1 rounded-full mr-2 ${item.is_active === "ACTIVE" ? "bg-green-100" : "bg-red-100"}`}>
											<Shield className={`h-3.5 w-3.5 ${item.is_active === "ACTIVE" ? "text-green-600" : "text-red-600"}`} />
										</div>
										<span className={item.is_active === "ACTIVE" ? "text-green-700" : "text-red-700"}>
											{item.is_active === "ACTIVE" ? "ACTIVE" : "BLOCKED"}
										</span>
									</div>

									<div className="flex items-center text-sm">
										<div className={`p-1 rounded-full mr-2 ${item.is_verified ? "bg-green-100" : "bg-red-100"}`}>
											{item.is_verified ? <CheckCircle className="h-3.5 w-3.5 text-green-600" /> : <XCircle className="h-3.5 w-3.5 text-red-600" />}
										</div>
										<span className={item.is_verified ? "text-green-700" : "text-red-700"}>{item.is_verified ? "Verified" : "Pending"}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			<Toast message="ID copied successfully!" show={showToast} />
		</>
	);
}

export default AllUserUi;
