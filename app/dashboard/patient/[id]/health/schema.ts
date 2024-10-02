import { BloodGroup } from "@prisma/client";
import { z } from "zod";

export const PatientHealthSchema = z.object({
  bloodGroup: z
    .nativeEnum(BloodGroup)
    .refine((value) => Object.values(BloodGroup).includes(value), {
      message: "required",
    }),
  height: z.number(),
  weight: z.number(),
  allergies: z.string().optional(),
  habits: z.string().optional(),
});

export type PatientHealthSchemaType = z.infer<typeof PatientHealthSchema>;
