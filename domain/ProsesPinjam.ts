import { z } from "zod";

export const ProsesPinjamSchema = z.object({
  id: z.string().optional(),
  status: z.string(),
  userId: z.string().optional(),
});

export type IProsesPinjamSchema = z.infer<typeof ProsesPinjamSchema>;
