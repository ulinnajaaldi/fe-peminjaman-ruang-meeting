import type { IUserSchema } from "@/domain/User";

export interface SaprasPeminjaman {
  quantity: string;
  name: string;
}

export interface DaftarPeminjaman {
  id: string;
  status: string;
  detailPeminjamanRuangan: {
    ruangan: string;
    employeeName: string;
    employeeDivision: string;
    employeeNik: string;
    employeePhone: string;
    employeeEmail: string;
    date: string;
    startHour: string;
    endHour: string;
    people: string;
    necessity: string;
    additional: string;
    saprasPeminjaman: SaprasPeminjaman[];
  }[];
}
