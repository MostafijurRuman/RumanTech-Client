import { cn } from "@/lib/utils";

export type DataTableColumn<T> = {
  header: string;
  cell: (row: T) => React.ReactNode;
  className?: string;
};

export function DataTable<T>({
  data,
  columns,
}: {
  data: T[];
  columns: DataTableColumn<T>[];
}) {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="grid border-b bg-muted/50 text-sm font-medium" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
        {columns.map((column) => (
          <div key={column.header} className={cn("p-3", column.className)}>
            {column.header}
          </div>
        ))}
      </div>
      <div className="divide-y">
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className="grid text-sm" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
            {columns.map((column) => (
              <div key={column.header} className={cn("p-3", column.className)}>
                {column.cell(row)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
