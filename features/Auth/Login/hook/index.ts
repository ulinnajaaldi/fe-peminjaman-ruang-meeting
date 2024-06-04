"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { type IUserLoginSchema, UserLoginSchema } from "@/domain/User";

export const useLoginFeature = () => {
  const form = useForm<IUserLoginSchema>({
    resolver: zodResolver(UserLoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  return {
    form,
  };
};
