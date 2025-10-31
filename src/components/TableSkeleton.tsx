import { TableCell, TableRow } from "./ui/table";

const TableSkeleton = () => {
	return (
		<TableRow>
			{[...Array(8)].map((_, i) => (
				<TableCell key={i}>
					<div className="h-4 bg-muted rounded animate-pulse" />
				</TableCell>
			))}
		</TableRow>
	);
};
export default TableSkeleton;
