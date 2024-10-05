import { AppointmentStatus } from "@prisma/client";
import { z } from "zod";

const requiredString = z.string().min(1, { message: "required" });

export const AppointmentSchema = z.object({
  purpose: requiredString,
  date: z.date(),
  startTime: z.date(),
  endTime: z.date(),
  status: z
    .nativeEnum(AppointmentStatus)
    .refine((value) => Object.values(AppointmentStatus).includes(value), {
      message: "required",
    }),
  doctorId: requiredString,
});

export type AppointmentSchemaType = z.infer<typeof AppointmentSchema>;
