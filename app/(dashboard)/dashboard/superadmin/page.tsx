import React from "react";
import { Metadata } from "next";

import DashboardSuperadminFeature from "@/features/Dashboard/Superadmin/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard Superadmin",
};

const DashboardSuperadmin = () => {
  return <DashboardSuperadminFeature />;
};

export default DashboardSuperadmin;
