"use client";

import * as React from "react";
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
  DataTableColumnAction,
  DataTableColumnHeader,
  DataTableLoader,
  DataTablePagination,
  DataTableViewOptions,
} from "@/components/common";
import type { IUserSchema } from "@/domain/User";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  limit: number;
  setLimit: (value: number) => void;
  page: number;
  setPage: (value: number) => void;
  totalPages: number;
  getUserById: any;
  deleteData: any;
  setIsEdit: (value: boolean) => void;
  setIsDialogOpen: (value: boolean) => void;
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
  getUserById,
  deleteData,
  setIsEdit,
  setIsDialogOpen,
}: DataTableProps<TData, TValue>) {
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
          const rowNumber = (page - 1) * limit + row.index + 1;
          return <div className="text-center">{rowNumber}</div>;
        },
        enableSorting: false,
      },
      ...columns,
      {
        id: "actions",
        cell: ({ row }) => {
          const datas = row.original as IUserSchema;

          return (
            <DataTableColumnAction
              id={datas.id || ""}
              showEdit
              getUserById={getUserById}
              setIsEdit={setIsEdit}
              setIsDialogOpen={setIsDialogOpen}
              deleteData={deleteData}
            />
          );
        },
      },
    ],
    [columns, page, limit, getUserById, deleteData, setIsEdit, setIsDialogOpen],
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
        <h1>Daftar Admin</h1>
        <DataTableViewOptions table={table} />
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
              <DataTableLoader />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  Tidak ada data
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
