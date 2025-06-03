import { MRT_ColumnFiltersState } from "mantine-react-table";

function isBooleanString(value: any) {
  return value === "true" || value === "false";
}

export const encodeColumnFilters = (columnFilters?: MRT_ColumnFiltersState) => {
  return encodeURIComponent(
    JSON.stringify(
      columnFilters?.map((filter) => ({
        id: filter.id,
        value: isBooleanString(filter.value) ? filter.value === "true" : filter.value
      }))
    )
  );
};
