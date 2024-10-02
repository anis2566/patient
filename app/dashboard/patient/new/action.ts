"use server";

import { db } from "@/lib/prisma";
import { PatientSchema, PatientSchemaType } from "../schema";

export const CREATE_PATIENT_ACTION = async (values: PatientSchemaType) => {
  const { data, success } = PatientSchema.safeParse(values);

  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  try {
    await db.patient.create({
      data: {
        ...data,
      },
    });
    return { success: "Patient created successfully" };
  } catch (error) {
    console.error("Error creating patient:", error);
    return {
      error: "Failed to create patient. Please try again.",
    };
  }
};
