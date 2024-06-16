"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  DetailPeminjamanRuanganSchema,
  IDetailPeminjamanRuanganSchema,
} from "@/domain/Ruangan";

const useRuanganDetailFeature = () => {
  const [checkKetersediaan, setCheckKetersediaan] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [isPinjam, setIsPinjam] = useState(false);
  const [saranaSelected, setSaranaSelected] = useState([] as any);
  const [saranaForm, setSaranaForm] = useState([] as any);

  const form = useForm<IDetailPeminjamanRuanganSchema>({
    resolver: zodResolver(DetailPeminjamanRuanganSchema),
  });

  return {
    checkKetersediaan,
    setCheckKetersediaan,
    selectedDate,
    setSelectedDate,
    isPinjam,
    setIsPinjam,
    saranaSelected,
    setSaranaSelected,
    saranaForm,
    setSaranaForm,
    form,
  };
};

export default useRuanganDetailFeature;
