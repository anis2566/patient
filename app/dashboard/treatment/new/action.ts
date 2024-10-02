"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { TreatmentSchema, TreatmentSchemaType } from "../schema";

export const GET_TREATMENT_CATEGORY = async () => {
  const categories = await db.treatmentCategory.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return categories;
};

export const CREATE_TREATMENT_ACTION = async (values: TreatmentSchemaType) => {
  const { data, success } = TreatmentSchema.safeParse(values);

  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  try {
    const treatment = await db.treatment.findFirst({
      where: {
        title: data.title,
      },
    });

    if (treatment) {
      return {
        error: "Treatment already exists",
      };
    }

    await db.treatment.create({
      data: {
        ...data,
      },
    });

    revalidatePath("/dashboard/treatment");

    return {
      success: "Treatment created successfully",
    };
  } catch (error) {
    return {
      error: "Failed to create treatment",
    };
  }
};
