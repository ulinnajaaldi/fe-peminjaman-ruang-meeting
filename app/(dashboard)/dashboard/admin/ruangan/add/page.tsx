import React from "react";
import { Metadata } from "next";
import DashboardRuanganAddFeature from "@/features/Dashboard/Admin/RuanganAdd";

export const metadata: Metadata = {
  title: "Dashboard Tambah Ruangan",
};

const DashboardRuanganAdd = () => {
  return <DashboardRuanganAddFeature />;
};

export default DashboardRuanganAdd;
