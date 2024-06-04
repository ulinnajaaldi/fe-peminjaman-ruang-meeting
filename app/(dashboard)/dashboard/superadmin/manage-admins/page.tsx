import React from "react";
import { Metadata } from "next";

import ManageAdminsFeature from "@/features/Dashboard/Superadmin/ManageAdmins";

export const metadata: Metadata = {
  title: "Dashboard Manage Admins",
};

const ManageAdmins = () => {
  return <ManageAdminsFeature />;
};

export default ManageAdmins;
