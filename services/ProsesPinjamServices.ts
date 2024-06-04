import { IDetailPeminjamanRuanganSchema } from "@/domain/Ruangan";
import { axiosInstance, axiosInstanceToken } from "@/lib/axios";

export const daftarPinjamUser = async () => {
  const response = await axiosInstanceToken.get(
    "/v1/api/proses-pinjam/user/details",
  );
  return response.data;
};

export const rejectDaftarPinjamUser = async (id: string) => {
  const response = await axiosInstanceToken.delete(
    `/v1/api/proses-pinjam/${id}`,
  );
  return response.data;
};

export const daftarPinjamAll = async (
  page: number,
  limit: number,
  status: string,
  search: string,
) => {
  const response = await axiosInstanceToken.get("/v1/api/proses-pinjam", {
    params: {
      page,
      limit,
      status,
      search,
    },
  });

  return response.data;
};

export const daftarPinjamDetail = async (id: string) => {
  const response = await axiosInstanceToken.get(`/v1/api/proses-pinjam/${id}`);
  return response.data;
};

export const acceptProsesPinjam = async (id: string) => {
  const response = await axiosInstanceToken.patch(
    `/v1/api/proses-pinjam/accept/${id}`,
  );

  return response.data;
};

export const rejectProsesPinjam = async (id: string) => {
  const response = await axiosInstanceToken.patch(
    `/v1/api/proses-pinjam/reject/${id}`,
  );

  return response.data;
};

export const detailPeminjamRuang = async (
  date: Date | undefined,
  idRuangan: string,
) => {
  const response = await axiosInstance.get(`v1/api/detail-peminjam-ruangan`, {
    params: {
      page: 1,
      limit: 20,
      seach: "",
      date,
      idRuangan,
    },
  });

  return response.data;
};

export const prosesPeminjamanRuangan = async (
  userId: string,
  idRuangan: string,
  value: IDetailPeminjamanRuanganSchema,
  date: string,
  saprasPeminjaman: any,
) => {
  const response = await axiosInstanceToken.post(
    "/v1/api/proses-pinjam/peminjaman-ruangan",
    {
      userId,
      detailPeminjamanRuangan: {
        idRuangan,
        ...value,
        date,
        saprasPeminjaman,
      },
    },
  );

  return response.data;
};
