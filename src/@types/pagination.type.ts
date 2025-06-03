import { MRT_ColumnFiltersState } from "mantine-react-table";

export type Pagination = {
  pageIndex: number;
  pageSize: number;
};

export type ServicePaginationParams = {
  url?: string;
  pagination: Pagination;
  filter?: string;
  columnFilters?: MRT_ColumnFiltersState;
};

export type PaginatedResponse<T> = {
  items: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
};
