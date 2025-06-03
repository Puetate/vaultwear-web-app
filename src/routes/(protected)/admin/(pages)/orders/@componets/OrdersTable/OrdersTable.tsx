import DataTable from "@/@components/DataTable/DataTable";
import { PAGE_INDEX, PAGE_SIZE } from "@/@constants/pagination.constants";
import { Order } from "@/@models/order.model";
import {
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_RowSelectionState,
  MRT_TableInstance
} from "mantine-react-table";
import { useLayoutEffect, useRef, useState } from "react";
import { useGetPaginatedOrders } from "./@services/getOrders.service";
import OrdersTableMenu from "./OrdersTableMenu";
import OrdersTableToolbar from "./OrdersTableToolbar";
import useOrdersTableColumns from "./useOrdersTableColumns";

interface OrdersTableProps {
  enableRowSelection?: boolean;
  onRowSelectionChange?: (selectedRow: Order) => void;
}

export default function OrdersTable({
  enableRowSelection = false,
  onRowSelectionChange
}: OrdersTableProps) {
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const tableRef = useRef<MRT_TableInstance<Order> | null>(null);
  const [filter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: PAGE_INDEX,
    pageSize: PAGE_SIZE
  });

  const {
    data: orders,
    isLoading,
    isFetching
  } = useGetPaginatedOrders({
    pagination,
    filter,
    columnFilters: enableRowSelection
      ? [...columnFilters, { id: "status", value: "ACTIVO" }]
      : columnFilters
  });

  const columns = useOrdersTableColumns();

  useLayoutEffect(() => {
    const selectedRow = tableRef.current?.getSelectedRowModel().rows[0]?.original;
    if (selectedRow) {
      onRowSelectionChange?.(selectedRow);
    }
  }, [rowSelection]);

  return (
    <DataTable
      tableRef={tableRef}
      columns={columns}
      data={orders?.items ?? []}
      state={{
        isLoading,
        pagination,
        globalFilter: filter,
        columnFilters,
        showProgressBars: isFetching,
        rowSelection
      }}
      enableRowSelection={enableRowSelection}
      enableTopToolbar={!enableRowSelection}
      enableRowActions={!enableRowSelection}
      onRowSelectionChange={setRowSelection}
      enableMultiRowSelection={false}
      rowCount={1}
      enableRowNumbers
      manualFiltering
      manualPagination
      enableColumnPinning
      enableSorting={false}
      autoResetPageIndex={false}
      onPaginationChange={setPagination}
      onGlobalFilterChange={setGlobalFilter}
      onColumnFiltersChange={setColumnFilters}
      renderTopToolbarCustomActions={OrdersTableToolbar}
      renderRowActionMenuItems={({ row }) => <OrdersTableMenu order={row.original} />}
    />
  );
}
