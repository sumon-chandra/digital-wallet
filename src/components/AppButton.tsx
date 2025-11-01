import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
interface AppButtonTypes {
	disabled?: boolean;
	isLoading?: boolean;
	label: string;
	onClick: () => void;
	variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
	className?: string;
}

const AppButton = ({ disabled, isLoading, label, onClick, variant = "default", className }: AppButtonTypes) => {
	return (
		<Button variant={variant} onClick={onClick} disabled={disabled} className={cn("", className)}>
			{isLoading && <Loader2 className="animate-spin size-3" />}
			{isLoading ? "Loading..." : label}
		</Button>
	);
};

export default AppButton;
