import type { ISaprasSchema } from "@/domain/Sapras";
import { axiosInstanceToken } from "@/lib/axios";

export const createSapras = async (values: ISaprasSchema) => {
  const response = await axiosInstanceToken.post("/v1/api/sapras", values);

  return response.data;
};

export const getAllSapras = async (
  page: number,
  limit: number,
  value: string,
) => {
  const res = await axiosInstanceToken.get("/v1/api/sapras", {
    params: {
      page,
      limit,
      search: value,
    },
  });

  return res.data;
};

export const updateSapras = async (id: string, values: ISaprasSchema) => {
  const response = await axiosInstanceToken.patch(
    `/v1/api/sapras/${id}`,
    values,
  );

  return response.data;
};

export const deleteSapras = async (id: string) => {
  await axiosInstanceToken.delete(`/v1/api/sapras/${id}`);

  return;
};
