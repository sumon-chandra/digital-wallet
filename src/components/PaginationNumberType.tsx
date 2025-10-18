import { Button } from "@/components/ui/button";
import type { PaginationProps } from "@/types/PaginationProps.type";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationNumberType = ({
  currentPage,
  totalItems,
  perPage = 9,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / perPage);
  if (totalPages <= 1) return null;

  // Function to determine the button's style based on its active state
  const getButtonClass = (page: number) => {
    return currentPage === page
      ? "bg-[#E2136E] dark:bg-[#E2136E] text-white hover:text-white font-bold hover:bg-[#E2136E] transition-all"
      : "bg-transparent text-gray-400 border border-gray-600 hover:bg-gray-800 hover:text-white transition-colors";
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6 p-4 rounded-xl bg-white dark:bg-black   border-2 dark:border-black">
      {/* Left Arrow Button */}
      <Button
        variant="link"
        size="sm"
        className="bg-transparent text-[#E2136E] border border-white dark:border-gray-600 hover:bg-gray-800 hover:text-white transition-colors"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1;
        return (
          <Button
            key={page}
            variant="link"
            size="sm"
            className={getButtonClass(page)}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        );
      })}

      {/* Right Arrow Button */}
      <Button
        variant="link"
        size="sm"
        className="bg-transparent text-[#E2136E] border border-white dark:border-gray-600 hover:bg-gray-800 hover:text-white transition-colors"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PaginationNumberType;
