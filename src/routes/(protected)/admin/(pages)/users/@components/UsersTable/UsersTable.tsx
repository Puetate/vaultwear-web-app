import DataTable from "@/@components/DataTable/DataTable";
import { PAGE_INDEX, PAGE_SIZE } from "@/@constants/pagination.constants";
import { MRT_ColumnFiltersState, MRT_PaginationState } from "mantine-react-table";
import { useState } from "react";
import { useGetPaginatedUsers } from "./@services/getUsers.service";
import UserTableMenu from "./UsersTableMenu";
import UserTableToolbar from "./UsersTableToolbar";
import userUsersTableColumns from "./userUsersTableColumns";

export default function UsersTable() {
  const [filter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: PAGE_INDEX,
    pageSize: PAGE_SIZE
  });

  const {
    data: users,
    isLoading,
    isFetching
  } = useGetPaginatedUsers({
    pagination,
    filter,
    columnFilters
  });

  const columns = userUsersTableColumns();

  return (
    <DataTable
      columns={columns}
      data={users?.items ?? []}
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
      renderTopToolbarCustomActions={UserTableToolbar}
      renderRowActionMenuItems={({ row }) => <UserTableMenu user={row.original} />}
    />
  );
}
