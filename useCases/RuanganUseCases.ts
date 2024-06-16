import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { ROUTES_PATH } from "@/constants/routes";
import { IRuanganSchema } from "@/domain/Ruangan";
import {
  createRuangan,
  deleteRuangan,
  getRuangan,
  getRuanganBySlug,
  getRuanganDetail,
  updateRuangan,
  getDetailPeminjamanRuangan,
} from "@/services/RuanganServices";

export const useCreateRuangan = (
  description: string,
  imagesArray: string[],
  facilities: string,
  router: any,
) => {
  return useMutation({
    mutationFn: (data: IRuanganSchema) =>
      createRuangan({
        ...data,
        slug: data.name.toLowerCase().replace(/\s/g, "-"),
        description,
        images: imagesArray,
        facilities,
        capacity: data.capacity,
      }),
    onSuccess: () => {
      toast.success("Ruangan berhasil ditambahkan");
      router.push(ROUTES_PATH.dashboardAdmin.ruangan);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateRuangan = (
  id: string,
  description: string,
  imagesArray: string[],
  facilities: string,
  router: any,
) => {
  return useMutation({
    mutationFn: (data: IRuanganSchema) =>
      updateRuangan(id, {
        ...data,
        slug: data.name.toLowerCase().replace(/\s/g, "-"),
        description,
        images: imagesArray,
        facilities,
        capacity: data.capacity,
      }),
    onSuccess: () => {
      toast.success("Ruangan berhasil diubah");
      router.push(ROUTES_PATH.dashboardAdmin.ruangan);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetRuangan = (value: string, page: number, limit: number) => {
  return useQuery({
    queryKey: ["ruangan-all", value, page, limit],
    queryFn: () => getRuangan(page, limit, value),
  });
};

export const useGetRuanganBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["ruangan", slug],
    queryFn: () => getRuanganBySlug(slug),
  });
};

export const useGetRuanganDetail = (slug: string) => {
  return useQuery({
    queryKey: ["ruangan-detail", slug],
    queryFn: () => getRuanganDetail(slug),
  });
};

export const useDeleteRuangan = (slug: string, router: any) => {
  return useMutation({
    mutationFn: () => deleteRuangan(slug),
    onSuccess: () => {
      toast.success("Ruangan berhasil dihapus");
      router.push(ROUTES_PATH.dashboardAdmin.ruangan);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetDetailPeminjamanRuangan = (
  idRuangan: string,
  date: Date | undefined,
) => {
  return useMutation({
    mutationFn: () => getDetailPeminjamanRuangan(idRuangan, date),
  });
};
