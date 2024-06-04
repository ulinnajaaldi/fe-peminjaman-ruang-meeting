import React from "react";
import DashboardWrapper from "@/components/layouts/dashboardWrapper";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return <DashboardWrapper>{children}</DashboardWrapper>;
}
