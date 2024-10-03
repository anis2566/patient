import { z } from "zod";

const requiredString = z.string().min(1, { message: "required" });

export const MedicineSchema = z.object({
  name: requiredString,
  description: z.string().optional(),
  genericId: requiredString,
  sideEffects: z.string().optional(),
  manufacturerId: requiredString,
  price: z.number().min(1, { message: "required" }),
});

export type MedicineSchemaType = z.infer<typeof MedicineSchema>;
