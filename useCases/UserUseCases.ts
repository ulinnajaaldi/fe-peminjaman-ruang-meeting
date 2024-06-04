import { useMutation, useQuery } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

import type { IUserSchema } from "@/domain/User";
import {
  createUser,
  deleteUser,
  getUser,
  getUserById,
  getUserByIdWithPassword,
  updateUser,
} from "@/services/UserServices";

export const useGetAdmins = (value: string, page: number, limit: number) => {
  return useQuery({
    queryKey: ["manage-admins", value, page, limit],
    queryFn: () => getUser(page, limit, value, "Admin"),
  });
};

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ["manage-admin", id],
    queryFn: () => getUserById(id),
  });
};

export const useGetUserByIdWithPassword = (id: string) => {
  return useQuery({
    queryKey: ["manage-admin-password", id],
    queryFn: () => getUserById(id),
  });
};

export const useMutateUserDetails = (
  form: UseFormReturn<IUserSchema>,
  setIsEdit: (value: React.SetStateAction<boolean>) => void,
  setSelectedData: (value: React.SetStateAction<IUserSchema | null>) => void,
) => {
  return useMutation({
    mutationFn: (id: string) => getUserByIdWithPassword(id),
    onSuccess: (data) => {
      form.reset(data?.data);
      setIsEdit(true);
      setSelectedData(data?.data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useCreateAdmin = (
  setIsDialogOpen: (value: React.SetStateAction<boolean>) => void,
  refetch: () => void,
  form: UseFormReturn<IUserSchema>,
) => {
  return useMutation({
    mutationFn: (values: IUserSchema) => createUser(values),
    onSuccess: () => {
      toast.success("Data berhasil ditambahkan");
      setIsDialogOpen(false);
      refetch();
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useEditAdmin = (
  selectedData: IUserSchema | null,
  setIsDialogOpen: (value: React.SetStateAction<boolean>) => void,
  refetch: () => void,
  form: UseFormReturn<IUserSchema>,
) => {
  return useMutation({
    mutationFn: (values: IUserSchema) =>
      updateUser(selectedData?.id || "", values),
    onSuccess: () => {
      toast.success("Data berhasil diubah");
      setIsDialogOpen(false);
      refetch();
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteAdmin = (refetch: () => void) => {
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
