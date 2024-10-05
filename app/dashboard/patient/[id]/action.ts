"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { PatientSchema, PatientSchemaType } from "../schema";

type UpdatePatientAction = {
  values: PatientSchemaType;
  id: string;
};

export const UPDATE_PATIENT_ACTION = async ({
  values,
  id,
}: UpdatePatientAction) => {
  const { data, success } = PatientSchema.safeParse(values);

  if (!success) return { error: "Invalid input values" };

  try {
    const patient = await db.patient.findUnique({
      where: {
        id,
      },
    });

    if (!patient) return { error: "Patient not found" };

    await db.patient.update({
      where: {
        id,
      },
      data: data,
    });

    revalidatePath(`/dashboard/patient/${id}`);

    return { success: "Patient updated successfully" };
  } catch (error) {
    return { error: "Failed to update patient" };
  }
};