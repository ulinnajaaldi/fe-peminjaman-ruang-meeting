import { type AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { ROUTES_PATH } from "@/constants/routes";
import { loginUser } from "@/services/AuthServices";
import { setCookie } from "@/lib/utils";

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("Login successful", {
        description: "You are now logged in",
      });
      setCookie(data.token);
      window.location.href = ROUTES_PATH.dashboardAdmin.home;
    },
    onError: (error: AxiosError) => {
      const errorMessage = error.response?.data as { error: string };
      toast.error("An error occurred", {
        description: errorMessage.error,
      });
    },
  });
};
