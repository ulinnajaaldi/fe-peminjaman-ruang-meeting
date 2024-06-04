import React from "react";
import { Metadata } from "next";

import DashboardAdminFeature from "@/features/Dashboard/Admin/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard Admin",
};

const DashboardAdmin = () => {
  return <DashboardAdminFeature />;
};

export default DashboardAdmin;
