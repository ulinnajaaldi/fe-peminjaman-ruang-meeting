import React from "react";
import { toast } from "sonner";
import {
  type QueryObserverResult,
  type RefetchOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import type { ISaprasSchema } from "@/domain/Sapras";
import {
  createSapras,
  deleteSapras,
  getAllSapras,
  updateSapras,
} from "@/services/SaprasServices";

export const useGetAllSapras = (page: number, limit: number, value: string) => {
  return useQuery({
    queryKey: ["sapras", value, page, limit],
    queryFn: () => getAllSapras(page, limit, value),
  });
};

export const useCreateSapras = (
  description: string,
  images: string,
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<any, Error>>,
) => {
  return useMutation({
    mutationFn: (data: ISaprasSchema) =>
      createSapras({
        ...data,
        description,
        images,
      }),
    onSuccess: () => {
      toast.success("Sapras berhasil ditambahkan");
      setIsDialogOpen(false);
      refetch();
    },
    onError: () => {
      toast.error("Sapras gagal ditambahkan");
    },
  });
};

export const useUpdateSapras = (
  selectedData: ISaprasSchema,
  description: string,
  images: string,
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<any, Error>>,
) => {
  return useMutation({
    mutationFn: (data: ISaprasSchema) =>
      updateSapras(selectedData.id || "", {
        ...data,
        description,
        images,
      }),
    onSuccess: () => {
      toast.success("Sapras berhasil diubah");
      setIsDialogOpen(false);
      refetch();
    },
    onError: () => {
      toast.error("Sapras gagal diubah");
    },
  });
};

export const useDeleteSapras = (
  selectedData: ISaprasSchema,
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>,
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<any, Error>>,
) => {
  return useMutation({
    mutationFn: () => deleteSapras(selectedData.id || ""),
    onSuccess: () => {
      toast.success("Sapras berhasil dihapus");
      setIsDialogOpen(false);
      setIsDelete(false);
      refetch();
    },
    onError: () => {
      toast.error("Sapras gagal dihapus");
    },
  });
};

export const useMutateAllSapras = () => {
  return useMutation({
    mutationFn: async () => getAllSapras(1, 20, ""),
  });
};
