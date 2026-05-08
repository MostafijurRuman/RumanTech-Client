"use client";

import { ArrowDownUp, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type DashboardColumn<T> = {
  key: keyof T | string;
  header: string;
  accessor: (row: T) => React.ReactNode;
  sortValue?: (row: T) => string | number;
  className?: string;
};

export function DashboardDataTable<T>({
  data,
  columns,
  searchPlaceholder = "Search",
  filter,
  isLoading,
  emptyText = "No records found",
}: {
  data: T[];
  columns: DashboardColumn<T>[];
  searchPlaceholder?: string;
  filter?: React.ReactNode;
  isLoading?: boolean;
  emptyText?: string;
}) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const pageSize = 8;

  const rows = useMemo(() => {
    const text = query.trim().toLowerCase();
    const filtered = text
      ? data.filter((row) => JSON.stringify(row).toLowerCase().includes(text))
      : data;

    const column = columns.find((item) => String(item.key) === sortKey);
    const sorted = column?.sortValue
      ? [...filtered].sort((a, b) => {
          const first = column.sortValue!(a);
          const second = column.sortValue!(b);
          const result = typeof first === "number" && typeof second === "number"
            ? first - second
            : String(first).localeCompare(String(second));
          return sortDirection === "asc" ? result : -result;
        })
      : filtered;

    return sorted;
  }, [columns, data, query, sortDirection, sortKey]);

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const visibleRows = rows.slice((page - 1) * pageSize, page * pageSize);

  function toggleSort(key: string) {
    setSortKey((current) => {
      if (current === key) {
        setSortDirection((direction) => (direction === "asc" ? "desc" : "asc"));
        return current;
      }
      setSortDirection("asc");
      return key;
    });
  }

  return (
    <div className="rounded-lg border bg-card/90 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-3 border-b p-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder={searchPlaceholder}
            className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm"
          />
        </div>
        {filter}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-muted/60 text-xs uppercase text-muted-foreground">
            <tr>
              {columns.map((column) => (
                <th key={String(column.key)} className={cn("px-4 py-3 font-medium", column.className)}>
                  <button type="button" onClick={() => toggleSort(String(column.key))} className="inline-flex items-center gap-2">
                    {column.header}
                    {column.sortValue && <ArrowDownUp className="size-3" />}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  <td colSpan={columns.length} className="px-4 py-3">
                    <div className="h-8 animate-pulse rounded-md bg-muted" />
                  </td>
                </tr>
              ))}
            {!isLoading &&
              visibleRows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-muted/40">
                  {columns.map((column) => (
                    <td key={String(column.key)} className={cn("px-4 py-3 align-middle", column.className)}>
                      {column.accessor(row)}
                    </td>
                  ))}
                </tr>
              ))}
            {!isLoading && visibleRows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-muted-foreground">
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t p-4 text-sm text-muted-foreground">
        <span>
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
