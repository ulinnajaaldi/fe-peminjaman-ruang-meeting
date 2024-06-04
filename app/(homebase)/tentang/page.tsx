import React from "react";
import type { Metadata } from "next";

import HomebaseTentangFeature from "@/features/Homebase/Tentang";

export const metadata: Metadata = {
  title: "Tentang",
};

const HomebaseTentang = () => {
  return <HomebaseTentangFeature />;
};

export default HomebaseTentang;
