import React from "react";
import {
  type QueryObserverResult,
  type RefetchOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { ROUTES_PATH } from "@/constants/routes";
import {
  acceptProsesPinjam,
  daftarPinjamAll,
  daftarPinjamDetail,
  daftarPinjamUser,
  detailPeminjamRuang,
  prosesPeminjamanRuangan,
  rejectDaftarPinjamUser,
  rejectProsesPinjam,
} from "@/services/ProsesPinjamServices";
import { IDetailPeminjamanRuanganSchema } from "@/domain/Ruangan";

export const useDaftarPinjamAll = (
  page: number,
  limit: number,
  status: string,
  value: string,
) => {
  return useQuery({
    queryKey: ["dafar-peminjaman", page, limit, status, value],
    queryFn: () => daftarPinjamAll(page, limit, status, value),
  });
};

export const useDaftarPinjamDetail = (id: string) => {
  return useQuery({
    queryKey: ["daftar-peminjaman-detail", id],
    queryFn: () => daftarPinjamDetail(id),
  });
};

export const useGetDaftarPinjamUser = () => {
  return useQuery({
    queryKey: ["user", "daftar-pinjaman"],
    queryFn: () => daftarPinjamUser(),
  });
};

export const useRejectDaftarPinjamUser = (
  id: string,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedData: React.Dispatch<any>,
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<any, Error>>,
) => {
  return useMutation({
    mutationFn: async () => rejectDaftarPinjamUser(id),
    onSuccess: () => {
      toast.success("Peminjaman berhasil dibatalkan");
      setIsOpen(false);
      setSelectedData(null);
      refetch();
    },
    onError: () => {
      toast.error("Gagal membatalkan peminjaman");
    },
  });
};

export const useAcceptProsesPinjam = (id: string, router: any) => {
  return useMutation({
    mutationFn: () => acceptProsesPinjam(id),
    onSuccess: () => {
      toast.success("Peminjaman berhasil disetujui!");
      router.push(ROUTES_PATH.dashboardAdmin.daftarPeminjaman);
    },
    onError: () => {
      toast.error("Peminjaman gagal disetujui");
    },
  });
};

export const useRejectProsesPinjam = (id: string, router: any) => {
  return useMutation({
    mutationFn: () => rejectProsesPinjam(id),
    onSuccess: () => {
      toast.success("Peminjaman berhasil ditolak!");
      router.push(ROUTES_PATH.dashboardAdmin.daftarPeminjaman);
    },
    onError: () => {
      toast.error("Peminjaman gagal ditolak");
    },
  });
};

export const useDetailPeminjamRuangan = (
  dataRuangan: any,
  selectedDate: Date | undefined,
  idRuangan: string,
) => {
  return useQuery({
    queryKey: ["peminjaman-ruangan", dataRuangan, selectedDate],
    queryFn: () => detailPeminjamRuang(selectedDate, idRuangan),
  });
};

export const useProsesPeminjamanRuangan = (
  userId: string,
  idRuangan: string,
  saprasPeminjaman: string,
  setIsPinjam: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return useMutation({
    mutationFn: (value: IDetailPeminjamanRuanganSchema) =>
      prosesPeminjamanRuangan(
        userId,
        idRuangan,
        value,
        value.date.toISOString(),
        saprasPeminjaman,
      ),
    onSuccess: () => {
      toast.success("Ruangan berhasil dipinjam", {
        description:
          "Silahkan cek dashboard untuk melihat status peminjaman ruangan",
      });
      setIsPinjam(false);
    },
    onError: () => {
      toast.error("Gagal meminjam ruangan");
    },
  });
};
