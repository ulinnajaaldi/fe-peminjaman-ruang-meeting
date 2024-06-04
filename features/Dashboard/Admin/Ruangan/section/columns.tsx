"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { IUserSchema } from "@/domain/User";
import { DataTableColumnHeader } from "@/components/common/data-table-column-header";

export const columns: ColumnDef<IUserSchema>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama depan" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Belakang" />
    ),
    enableSorting: false,
  },
];
