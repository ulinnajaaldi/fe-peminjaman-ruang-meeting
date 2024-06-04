"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DayClickEventHandler } from "react-day-picker";

import useAuthStore from "@/hook/useAuth";
import {
  DetailPeminjamanRuanganSchema,
  IDetailPeminjamanRuanganSchema,
} from "@/domain/Ruangan";

const useRuanganDetailFeature = () => {
  const router = useRouter();
  const [data] = useAuthStore(useShallow((state) => [state.data]));

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [booked, setBooked] = useState(false);
  const [isPinjam, setIsPinjam] = useState(false);
  const [saranaSelected, setSaranaSelected] = useState([] as any);
  const [saranaForm, setSaranaForm] = useState([] as any);

  const form = useForm<IDetailPeminjamanRuanganSchema>({
    resolver: zodResolver(DetailPeminjamanRuanganSchema),
  });

  const handleDayClick: DayClickEventHandler = (day, modifiers) => {
    setBooked(day && modifiers.booked);
  };

  return {
    router,
    data,
    selectedDate,
    setSelectedDate,
    booked,
    setBooked,
    isPinjam,
    setIsPinjam,
    saranaSelected,
    setSaranaSelected,
    saranaForm,
    setSaranaForm,
    form,
    handleDayClick,
  };
};

export default useRuanganDetailFeature;
