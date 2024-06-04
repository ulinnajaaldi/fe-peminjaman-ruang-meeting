import React from "react";
import DaftarPeminjamanDetailFeature from "@/features/Dashboard/Admin/DetailDaftarPeminjaman";

const DaftarPeminjamanDetail = ({ params }: { params: { id: string } }) => {
  return <DaftarPeminjamanDetailFeature params={params} />;
};

export default DaftarPeminjamanDetail;
