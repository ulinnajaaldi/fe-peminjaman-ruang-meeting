import React from "react";
import type { Metadata } from "next";
import DashboardRuanganEditFeature from "@/features/Dashboard/Admin/RuanganEdit";

export const metadata: Metadata = {
  title: "Dashboard Edit Ruangan",
};

const DashboardRuanganEdit = ({ params }: { params: { slug: string } }) => {
  return <DashboardRuanganEditFeature params={params} />;
};

export default DashboardRuanganEdit;
