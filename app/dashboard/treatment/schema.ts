import { z } from "zod";

const requiredString = z.string().min(1, { message: "required" });

export const TreatmentSchema = z.object({
  title: requiredString.min(4, { message: "min 4 characters" }),
  description: requiredString.min(4, { message: "min 4 characters" }),
  categoryId: requiredString,
});

export type TreatmentSchemaType = z.infer<typeof TreatmentSchema>;
