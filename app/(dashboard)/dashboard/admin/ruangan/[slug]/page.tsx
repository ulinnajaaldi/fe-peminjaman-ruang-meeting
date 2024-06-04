import React from "react";
import type { Metadata } from "next";
import DashboardRuanganDetailFeature from "@/features/Dashboard/Admin/RuanganDetail";

export const metadata: Metadata = {
  title: "Dashboard Detail Ruangan",
};

const DashboardRuanganDetail = ({ params }: { params: { slug: string } }) => {
  return <DashboardRuanganDetailFeature params={params} />;
};

export default DashboardRuanganDetail;
