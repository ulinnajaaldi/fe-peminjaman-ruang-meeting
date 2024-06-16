"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/common/data-table-column-header";
import { cn, statusColor } from "@/lib/utils";
import type { DaftarPeminjaman, SaprasPeminjaman } from "../types";

export const columns: ColumnDef<DaftarPeminjaman>[] = [
  {
    accessorKey: "detailPeminjamanRuangan.ruangan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ruangan" />
    ),
    cell: ({ row }) => {
      const datas = row.original;

      return <span>{datas.detailPeminjamanRuangan[0].ruangan}</span>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "detailPeminjamanRuangan.employeeName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Peminjam" />
    ),
    cell: ({ row }) => {
      const datas = row.original;

      return <span>{datas.detailPeminjamanRuangan[0].employeeName}</span>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "detailPeminjamanRuangan.employeeDivision",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Divisi" />
    ),
    cell: ({ row }) => {
      const datas = row.original;

      return <span>{datas.detailPeminjamanRuangan[0].employeeDivision}</span>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "detailPeminjamanRuangan.date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal" />
    ),
    cell: ({ row }) => {
      const datas = row.original;
      let dateValue = new Date(datas.detailPeminjamanRuangan[0].date);
      return (
        <span>
          {dateValue.toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey:
      "detailPeminjamanRuangan.startHour + detailPeminjamanRuangan.endHour",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Waktu" />
    ),
    cell: ({ row }) => {
      const datas = row.original;
      return (
        <span>
          {datas.detailPeminjamanRuangan[0].startHour} -{" "}
          {datas.detailPeminjamanRuangan[0].endHour}
        </span>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "detailPeminjamanRuangan.necessity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kebutuhan" />
    ),
    cell: ({ row }) => {
      const datas = row.original;
      return (
        <span className="line-clamp-1">
          {datas.detailPeminjamanRuangan[0].necessity}
        </span>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "detailPeminjamanRuangan.saprasPeminjaman",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sapras" />
    ),
    cell: ({ row }) => {
      const datas = row.original;
      return (
        <div>
          {datas.detailPeminjamanRuangan[0].saprasPeminjaman.length > 0 ? (
            datas.detailPeminjamanRuangan[0].saprasPeminjaman.map(
              (item: SaprasPeminjaman, index: number) => (
                <span key={index} className="block">
                  {item.name} - {item.quantity}/pcs
                </span>
              ),
            )
          ) : (
            <span>-</span>
          )}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const datas = row.original;
      return (
        <span className={`${statusColor(datas.status)}`}>{datas.status}</span>
      );
    },
  },
];
