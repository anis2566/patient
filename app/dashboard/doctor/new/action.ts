"use server";

import { db } from "@/lib/prisma";
import { DoctorSchema, DoctorSchemaType } from "../schema";

export const CREATE_DOCTOR_ACTION = async (values: DoctorSchemaType) => {
  const { data, success } = DoctorSchema.safeParse(values);

  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  try {
    await db.doctor.create({
      data: {
        ...data,
      },
    });

    return {
      success: "Doctor created successfully",
    };
  } catch (error) {
    return {
      error: "Failed to create doctor",
    };
  }
};
