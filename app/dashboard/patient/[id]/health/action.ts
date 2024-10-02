"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { PatientHealthSchema, PatientHealthSchemaType } from "./schema";

type UpdatePatientHealth = {
  patientId: string;
  values: PatientHealthSchemaType;
};

export const UPDATE_PATIENT_HEALTH = async ({
  patientId,
  values,
}: UpdatePatientHealth) => {
  const { data, success } = PatientHealthSchema.safeParse(values);
  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  try {
    await db.patientHealth.upsert({
      where: {
        patientId,
      },
      update: data,
      create: {
        ...data,
        patientId,
      },
    });

    revalidatePath(`/dashboard/patient/${patientId}/health`);

    return {
      success: "Patient health updated successfully",
    };
  } catch (error) {
    return {
      error: "Failed to update patient health",
    };
  }
};
