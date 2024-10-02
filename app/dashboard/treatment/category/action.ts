"use server";

import { revalidatePath } from "next/cache";

import {
  TreatmentCategorySchema,
  TreatmentCategorySchemaType,
} from "@/app/dashboard/treatment/category/schema";
import { db } from "@/lib/prisma";

export const CREATE_TREATMENT_CATEGORY_ACTION = async (
  values: TreatmentCategorySchemaType,
) => {
  const { data, success } = TreatmentCategorySchema.safeParse(values);

  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  try {
    const category = await db.treatmentCategory.findFirst({
      where: {
        name: data.name,
      },
    });

    if (category) {
      return {
        error: "Treatment category already exists",
      };
    }

    await db.treatmentCategory.create({
      data: {
        ...data,
      },
    });

    revalidatePath("/dashboard/treatment/category");

    return {
      success: "Treatment category created successfully",
    };
  } catch (error) {
    return {
      error: "Failed to create treatment category",
    };
  }
};

export const DELETE_TREATMENT_CATEGORY_ACTION = async (id: string) => {
  try {
    const category = await db.treatmentCategory.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      return {
        error: "Treatment category not found",
      };
    }

    await db.treatmentCategory.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard/treatment/category");

    return {
      success: "Treatment category deleted successfully",
    };
  } catch (error) {
    return {
      error: "Failed to delete treatment category",
    };
  }
};
