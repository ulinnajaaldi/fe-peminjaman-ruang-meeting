import { z } from "zod";

export const SaprasSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3),
  description: z.string().optional(),
  images: z.string().optional(),
  ammount: z.string().min(1),
});

export type ISaprasSchema = z.infer<typeof SaprasSchema>;

export const SaprasPeminjamanSchema = z.object({
  idSapras: z.string().optional(),
  idRuangan: z.string().optional(),
  idProsessPinjam: z.string().optional(),
  quantity: z.string(),
});

export type ISaprasPeminjamanSchema = z.infer<typeof SaprasPeminjamanSchema>;
