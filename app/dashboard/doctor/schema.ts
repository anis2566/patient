import { z } from "zod";

const requiredString = z.string().min(1, { message: "required" });

export const DoctorSchema = z.object({
  name: requiredString.min(4, { message: "minimum 4 characters" }),
  email: z.string().email({ message: "invalid email" }),
  phone: requiredString.min(11, { message: "invalid phone number" }),
  address: requiredString,
  imageUrl: requiredString,
});

export type DoctorSchemaType = z.infer<typeof DoctorSchema>;
