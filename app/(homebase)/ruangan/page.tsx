import React from "react";
import type { Metadata } from "next";

import HomebaseRuanganFeature from "@/features/Homebase/Ruangan";

export const metadata: Metadata = {
  title: "Daftar Ruangan",
};

const HomebaseRuangan = () => {
  return <HomebaseRuanganFeature />;
};

export default HomebaseRuangan;
