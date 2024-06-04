import { IUserSchema } from "@/domain/User";
import { axiosInstanceToken } from "@/lib/axios";

export const getUser = async (
  page: number,
  limit: number,
  search: string,
  role: string,
) => {
  const response = await axiosInstanceToken.get("/v1/api/user", {
    params: {
      page,
      limit,
      search,
      role,
    },
  });

  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await axiosInstanceToken.get(`/v1/api/user/${id}`);

  return response.data;
};

export const getUserByIdWithPassword = async (id: string) => {
  const response = await axiosInstanceToken.get(`/v1/api/user/${id}/password`);

  return response.data;
};

export const createUser = async (values: IUserSchema) => {
  const response = await axiosInstanceToken.post("/v1/api/user", values);

  return response.data;
};

export const updateUser = async (id: string, values: IUserSchema) => {
  const response = await axiosInstanceToken.patch(`/v1/api/user/${id}`, values);

  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await axiosInstanceToken.delete(`/v1/api/user/${id}`);

  return response.data;
};
