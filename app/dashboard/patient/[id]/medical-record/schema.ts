import { MedicineFrequency, MedicineInstruction } from "@prisma/client";
import { z } from "zod";

const requiredString = z.string().min(1, { message: "required" });

export const MedicalRecordMedicineSchema = z.object({
  medicineId: requiredString,
  quantity: z.number().min(1, { message: "required" }),
  frequency: z
    .nativeEnum(MedicineFrequency)
    .refine((data) => Object.values(MedicineFrequency).includes(data), {
      message: "required",
    }),
  instruction: z
    .nativeEnum(MedicineInstruction)
    .refine((data) => Object.values(MedicineInstruction).includes(data), {
      message: "required",
    }),
});

export type MedicalRecordMedicineSchemaType = z.infer<
  typeof MedicalRecordMedicineSchema
>;

export const MedicalRecordSchema = z.object({
  complains: requiredString,
  diagnosis: z.string().optional(),
  vitalSigns: z.string().optional(),
  treatmentId: z.string().optional(),
  doctorId: requiredString,
  medicines: z
    .array(MedicalRecordMedicineSchema)
    .min(1, { message: "required" }),
});

export type MedicalRecordSchemaType = z.infer<typeof MedicalRecordSchema>;
