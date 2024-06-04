import { IRuanganSchema } from "@/domain/Ruangan";
import { axiosInstance, axiosInstanceToken } from "@/lib/axios";

export const createRuangan = async (values: IRuanganSchema) => {
  const response = await axiosInstanceToken.post("/v1/api/ruangan", values);

  return response.data;
};

export const updateRuangan = async (id: string, values: IRuanganSchema) => {
  const response = await axiosInstanceToken.patch(
    `/v1/api/ruangan/${id}`,
    values,
  );

  return response.data;
};

export const getRuangan = async (
  page: number,
  limit: number,
  search: string,
) => {
  const response = await axiosInstanceToken.get("/v1/api/ruangan", {
    params: {
      page,
      limit,
      search,
    },
  });

  return response.data;
};

export const getRuanganBySlug = async (slug: string) => {
  const response = await axiosInstanceToken.get(`/v1/api/ruangan/${slug}`);

  return response.data;
};

export const getRuanganDetail = async (slug: string) => {
  const response = await axiosInstance.get(`/v1/api/ruangan/${slug}/detail`);

  return response.data;
};

export const deleteRuangan = async (slug: string) => {
  await axiosInstanceToken.delete("/v1/api/ruangan/" + slug);

  return;
};
