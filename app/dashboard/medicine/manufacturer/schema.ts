import { z } from "zod";

const requiredString = z.string().min(1, { message: "required" });

export const ManufacturerSchema = z.object({
  name: requiredString,
  description: z.string().optional(),
  imageUrl: z.string().optional(),
});

export type ManufacturerSchemaType = z.infer<typeof ManufacturerSchema>;
