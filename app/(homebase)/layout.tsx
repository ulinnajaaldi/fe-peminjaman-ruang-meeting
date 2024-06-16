import React from "react";

import Footer from "@/components/layouts/footer";
import Navbar from "@/components/layouts/navbar";

export default function HomebaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="">{children}</div>
      <Footer />
    </>
  );
}
