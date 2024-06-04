"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { UserSchema, type IUserSchema } from "@/domain/User";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const useManageAdminsFeature = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedData, setSelectedData] = useState<IUserSchema | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 1000);

  const form = useForm<IUserSchema>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      role: "Admin",
      password: "",
    },
  });

  const handleAddData = () => {
    form.reset({
      fullname: "",
      username: "",
      email: "",
      role: "Admin",
      password: "",
    });
    setIsDialogOpen(true);
    setIsEdit(false);
  };

  return {
    isDialogOpen,
    setIsDialogOpen,
    isEdit,
    setIsEdit,
    selectedData,
    setSelectedData,
    page,
    setPage,
    limit,
    setLimit,
    search,
    setSearch,
    value,
    form,
    handleAddData,
  };
};

export default useManageAdminsFeature;
