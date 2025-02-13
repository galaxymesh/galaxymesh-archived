import React from "react";
import MUIDataTable from "mui-datatables";

export interface ResponsiveColumn {
  name: string;
  label: string;
  options?: {
    filter?: boolean;
    sort?: boolean;
    searchable?: boolean;
    display?: boolean | undefined;
    sortDescFirst?: boolean;
    customBodyRender?: (
      value: string | number | boolean | object
    ) => JSX.Element;
  };
}

export interface ResponsiveDataTableProps {
  data: string[][];
  columns: ResponsiveColumn[];
  options?: object;
  tableCols?: ResponsiveColumn[];
  updateCols?: ((columns: ResponsiveColumn[]) => void) | undefined;
  columnVisibility: Record<string, boolean> | undefined;
  theme?: object;
  colViews?: Record<string, boolean> | undefined;
}

export function ResponsiveDataTable({
  data,
  columns,
  options = {},
  tableCols,
  updateCols,
  columnVisibility,
  ...props
}: ResponsiveDataTableProps): JSX.Element {
  const formatDate = (date: Date): string => {
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    return new Intl.DateTimeFormat("un-US", dateOptions).format(date);
  };

  const updatedOptions = {
    ...options,
    onViewColumnsChange: (column: string, action: string) => {
      switch (action) {
        case "add": {
          const colToAdd = columns.find((obj) => obj.name === column);
          if (colToAdd) {
            if (colToAdd.options) {
              colToAdd.options.display = true;
              updateCols && updateCols([...columns]);
            }
          }
          break;
        }
        case "remove": {
          const colToRemove = columns.find((obj) => obj.name === column);
          if (colToRemove) {
            if (colToRemove.options) {
              colToRemove.options.display = false;
              updateCols && updateCols([...columns]);
            }
          }
          break;
        }
      }
    },
  };

  React.useEffect(() => {
    columns?.forEach((col) => {
      console.log("Current Column:", col);
      if (typeof col === "object" && col !== null) {
        if (!col.options) {
          col.options = {};
        }
        col.options.display = columnVisibility && columnVisibility[col.name];

        if (
          [
            "updated_at",
            "created_at",
            "deleted_at",
            "last_login_time",
            "joined_at",
          ].includes(col.name)
        ) {
          col.options.customBodyRender = (
            value: string | number | boolean | object
          ) => {
            if (value === "NA") {
              return <>{value}</>;
            } else if (typeof value === "object" && "Valid" in value) {
              const obj = value as { Valid: boolean; Time: string | undefined };
              if (obj.Valid && obj.Time) {
                const date = new Date(obj.Time);
                return <>{formatDate(date)}</>;
              } else {
                return <>NA</>;
              }
            } else if (typeof value === "string") {
              const date = new Date(value);
              return <>{formatDate(date)}</>;
            } else {
              return <>{value}</>;
            }
          };
        }
      }
    });
    updateCols && updateCols([...columns]);
  }, [columnVisibility]);

  const components = {
    ExpandButton: () => "",
  };

  return (
    <MUIDataTable
      columns={tableCols ?? []}
      data={data || []}
      title={undefined}
      components={components}
      options={updatedOptions}
      {...props}
    />
  );
}

export default ResponsiveDataTable;