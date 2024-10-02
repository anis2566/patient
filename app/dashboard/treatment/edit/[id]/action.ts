"use server";

import { revalidatePath } from "next/cache";

import { TreatmentSchema, TreatmentSchemaType } from "../../schema";
import { db } from "@/lib/prisma";

type UpdateTreatmentAction = {
  id: string;
  values: TreatmentSchemaType;
};

export const UPDATE_TREATMENT_ACTION = async ({
  id,
  values,
}: UpdateTreatmentAction) => {
  const { data, success } = TreatmentSchema.safeParse(values);

  if (!success) return { error: "Invalid input values" };

  try {
    const treatment = await db.treatment.findUnique({
      where: {
        id,
      },
    });

    if (!treatment) return { error: "Treatment not found" };

    const updatedTreatment = await db.treatment.update({
      where: {
        id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    revalidatePath("/dashboard/treatment");

    return { success: "Treatment updated successfully" };
  } catch (error) {
    return { error: "Failed to update treatment" };
  }
};
