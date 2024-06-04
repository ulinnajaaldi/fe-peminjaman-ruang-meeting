"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const useDetailDaftarPeminjamanFeature = () => {
  const router = useRouter();
  const [alertAccept, setAlertAccept] = useState(false);
  const [alertReject, setAlertReject] = useState(false);

  return {
    router,
    alertAccept,
    setAlertAccept,
    alertReject,
    setAlertReject,
  };
};

export default useDetailDaftarPeminjamanFeature;
