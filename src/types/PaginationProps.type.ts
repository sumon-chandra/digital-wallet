export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  perPage?: number;
  onPageChange: (page: number) => void;
}