import React from "react";
import { Metadata } from "next";
import DaftarPeminjamanFeature from "@/features/Dashboard/Admin/DaftarPeminjaman";

export const metadata: Metadata = {
  title: "Dashboard Daftar Peminjaman",
};

const DaftarPeminjaman = () => {
  return <DaftarPeminjamanFeature />;
};

export default DaftarPeminjaman;
