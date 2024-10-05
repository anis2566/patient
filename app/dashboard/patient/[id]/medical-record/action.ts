"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";

export const DELETE_MEDICAL_RECORD_ACTION = async (id: string) => {
  try {
    const medicalRecord = await db.medicalRecord.findUnique({
      where: {
        id,
      },
    });

    if (!medicalRecord) return { error: "Medical record not found" };

    await db.medicalRecord.delete({
      where: {
        id,
      },
    });

    revalidatePath(
      `/dashboard/patient/${medicalRecord.patientId}/medical-record`,
    );

    return { success: "Medical record deleted successfully" };
  } catch (error) {
    return { error: "Failed to delete medical record" };
  }
};
