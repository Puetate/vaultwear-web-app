import { ServicePaginationParams } from "@/@types/pagination.type";
import { encodeColumnFilters } from "./encodeColumnFilters.util";

export function generatePaginationUrl(base: string, params: ServicePaginationParams) {
  const {
    pagination: { pageIndex, pageSize },
    filter,
    columnFilters
  } = params;
  return `${base}?page=${pageIndex}&size=${pageSize}&filter=${filter ?? ""}&columnFilters=${encodeColumnFilters(columnFilters)}`;
}
