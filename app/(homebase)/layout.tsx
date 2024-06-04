import React from "react";
import NextTopLoader from "nextjs-toploader";

import Footer from "@/components/layouts/footer";
import Navbar from "@/components/layouts/navbar";

export default function HomebaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NextTopLoader showSpinner={false} />
      <Navbar />
      <div className="">{children}</div>
      <Footer />
    </>
  );
}
