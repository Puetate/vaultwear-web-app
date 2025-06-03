import DataTable from "@/@components/DataTable/DataTable";
import { PAGE_INDEX, PAGE_SIZE } from "@/@constants/pagination.constants";
import { MRT_ColumnFiltersState, MRT_PaginationState } from "mantine-react-table";
import { useState } from "react";
import { useGetPaginatedPersons } from "./@services/getPersons.service";
import PersonTableMenu from "./PersonTableMenu";
import PersonTableToolbar from "./PersonTableToolbar";
import usePersonTableColumns from "./usePersonTableColumns";

export default function PersonTable() {
  const [filter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: PAGE_INDEX,
    pageSize: PAGE_SIZE
  });

  const {
    data: persons,
    isLoading,
    isFetching
  } = useGetPaginatedPersons({
    pagination,
    filter,
    columnFilters
  });

  const columns = usePersonTableColumns();

  return (
    <DataTable
      columns={columns}
      data={persons?.items ?? []}
      state={{
        isLoading,
        pagination,
        globalFilter: filter,
        columnFilters,
        showProgressBars: isFetching
      }}
      rowCount={1}
      enableRowNumbers
      manualFiltering
      manualPagination
      enableRowActions
      enableColumnPinning
      enableSorting={false}
      autoResetPageIndex={false}
      onPaginationChange={setPagination}
      onGlobalFilterChange={setGlobalFilter}
      onColumnFiltersChange={setColumnFilters}
      renderTopToolbarCustomActions={PersonTableToolbar}
      renderRowActionMenuItems={({ row }) => <PersonTableMenu person={row.original} />}
    />
  );
}
