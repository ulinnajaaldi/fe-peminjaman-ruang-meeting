import React from "react";
import type { Metadata } from "next";
import DashboardRuanganFeature from "@/features/Dashboard/Admin/Ruangan";

export const metadata: Metadata = {
  title: "Dashboard Ruangan",
};

const DashboardRuangan = () => {
  return <DashboardRuanganFeature />;
};

export default DashboardRuangan;
