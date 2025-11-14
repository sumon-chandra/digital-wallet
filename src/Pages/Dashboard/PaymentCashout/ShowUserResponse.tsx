import { CheckCircle2, LoaderCircle } from "lucide-react";

interface Props {
	success: boolean;
	error: boolean | string;
	loading: boolean;
}
export const ShowUserResponse = ({ success, error, loading }: Props) => {
	return (
		<>
			{loading && (
				<p className="flex items-center text-sm gap-2">
					<LoaderCircle className="animate-spin text-sm" /> <span>Please wait.</span>
				</p>
			)}
			{error && <p className="text-destructive pb-2 text-sm">User not found.</p>}
			{success && (
				<p className="text-primary pb-2 text-sm flex items-center gap-1">
					<CheckCircle2 className="size-4" /> <span>Continue</span>
				</p>
			)}
		</>
	);
};
