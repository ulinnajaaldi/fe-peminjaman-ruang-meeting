"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DataTableColumnHeader,
  DataTableLoader,
  DataTablePagination,
} from "@/components/common";
import { Button } from "@/components/ui/button";
import { ROUTES_PATH } from "@/constants/routes";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  limit: number;
  setLimit: (value: number) => void;
  page: number;
  setPage: (value: number) => void;
  totalPages: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  limit,
  setLimit,
  page,
  setPage,
  totalPages,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columnsWithRowNumbers = React.useMemo(
    () => [
      {
        id: "number",
        accessorKey: "number",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="No"
            className="text-center"
          />
        ),
        cell: ({ row }) => {
          const index = row.index + 1;
          return <div className="text-center">{index}</div>;
        },
        enableSorting: false,
      },
      ...columns,
      {
        accessorKey: "action",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Action"
            className="text-center"
          />
        ),
        cell: ({ row }) => {
          const datas: any = row.original;

          return (
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => {
                  router.push(
                    `${ROUTES_PATH.dashboardAdmin.daftarPeminjaman}/${datas.id}`,
                  );
                }}
              >
                Detail
              </Button>
            </div>
          );
        },
        enableSorting: false,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columns],
  );

  const table = useReactTable({
    data,
    columns: columnsWithRowNumbers,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <h1>Daftar Peminjaman Ruang</h1>
      </div>
      <div className="mb-4 rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <DataTableLoader tableLength={11} />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-xs sm:text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 2}
                  className="h-24 text-center"
                >
                  Belum ada pinjaman ruang
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>
  );
}
