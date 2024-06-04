import React from "react";
import type { Metadata } from "next";
import SaprasFeature from "@/features/Dashboard/Admin/Sapras";

export const metadata: Metadata = {
  title: "Dashboard Ruangan",
};

const Sapras = () => {
  return <SaprasFeature />;
};

export default Sapras;
