import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {
  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-5 w-16" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/4 mt-2" />
      </div>
    </div>
  );
};

export default SkeletonCard;
