"use client";

import React from "react";

import { useDaftarPinjamAll } from "@/useCases/ProsesPinjamUseCases";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import useDaftarPeminjamanFeature from "./hook";
import { DataTable } from "./section/data-table";
import { columns } from "./section/columns";

const DaftarPeminjamanFeature = () => {
  const {
    page,
    setPage,
    limit,
    setLimit,
    status,
    setStatus,
    search,
    setSearch,
    value,
  } = useDaftarPeminjamanFeature();

  const { data, isLoading } = useDaftarPinjamAll(page, limit, status, value);

  return (
    <div>
      <h1 className="text-4xl font-semibold">Daftar Peminjaman Ruang</h1>
      <div className="mt-10 flex items-center justify-between">
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={status} onValueChange={(value) => setStatus(value)}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="Menunggu Persetujuan">
                Menunggu Persetujuan
              </SelectItem>
              <SelectItem value="Disetujui">Disetujui</SelectItem>
              <SelectItem value="Ditolak">Ditolak</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={data?.data}
        isLoading={isLoading}
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        totalPages={data?.totalPages}
      />
    </div>
  );
};

export default DaftarPeminjamanFeature;
