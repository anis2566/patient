import { Gender, BloodGroup } from "@prisma/client";
import { z } from "zod";

const requiredString = z.string().min(1, { message: "required" });

export const PatientSchema = z.object({
  name: requiredString.min(3, { message: "invalid name" }),
  email: requiredString.email({ message: "invalid email" }).optional(),
  gender: z
    .nativeEnum(Gender)
    .refine((value) => Object.values(Gender).includes(value), {
      message: "required",
    }),
  phone: requiredString.min(11, { message: "invalid phone number" }),
  address: requiredString.min(6, { message: "invalid address" }),
  dob: z.date().refine((date) => date !== null, { message: "required" }),
  emergencyContact: requiredString.min(11, { message: "invalid phone number" }),
  imageUrl: z.string().optional(),
  bloodGroup: z.nativeEnum(BloodGroup).optional(),
});

export type PatientSchemaType = z.infer<typeof PatientSchema>;
