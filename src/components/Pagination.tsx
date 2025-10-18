import React from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  totalPage: number;
  total: number;
  canGoPrev: boolean;
  canGoNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPage,
  total,
  canGoPrev,
  canGoNext,
  onPrev,
  onNext,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPage} • {total} result{total === 1 ? "" : "s"}
      </p>
      <div className="flex items-center gap-2 justify-end">
        <Button variant="link" disabled={!canGoPrev} onClick={onPrev}>
          Previous
        </Button>
        <Button variant="link" disabled={!canGoNext} onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
