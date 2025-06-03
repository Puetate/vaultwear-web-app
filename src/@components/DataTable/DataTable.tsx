import {
  MRT_RowData,
  MRT_TableInstance,
  MRT_TableOptions,
  MantineReactTable,
  useMantineReactTable
} from "mantine-react-table";
import { MRT_Localization_ES } from "mantine-react-table/locales/es/index.cjs";
import { RefObject, useEffect } from "react";

interface DataTableProps<T extends MRT_RowData> extends MRT_TableOptions<T> {
  tableRef?: RefObject<MRT_TableInstance<T> | null>;
}

export default function DataTable<T extends MRT_RowData>(props: DataTableProps<T>) {
  const {
    tableRef,
    initialState,
    mantineTableContainerProps,
    mantineBottomToolbarProps,
    mantineFilterSelectProps,
    ...tableProps
  } = props;
  const table = useMantineReactTable({
    ...tableProps,
    enableStickyHeader: true,
    enableStickyFooter: true,
    mantineFilterTextInputProps: {
      classNames: { input: "border-none" }
    },
    mantineTableContainerProps: {
      ...{ className: "max-h-[500px] " },
      ...mantineTableContainerProps
    },
    // icons,
    initialState: {
      density: "xs",
      showGlobalFilter: true,
      globalFilter: "",
      columnPinning: {
        right: ["mrt-row-actions"]
      },
      ...initialState
    },
    localization: MRT_Localization_ES,
    mantineBottomToolbarProps: {
      ...mantineBottomToolbarProps,
      ...{ className: "" }
    },
    mantineFilterSelectProps: {
      ...mantineFilterSelectProps,
      ...{ classNames: { input: "border-none" } }
    }
  });
  useEffect(() => {
    if (tableRef) {
      tableRef.current = table;
    }
  }, [table, tableRef]);

  return <MantineReactTable table={table} />;
}
