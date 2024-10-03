"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { GenericSchema, GenericSchemaType } from "./schema";

export const CREATE_GENERIC_ACTION = async (values: GenericSchemaType) => {
  const { data, success } = GenericSchema.safeParse(values);

  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  try {
    const generic = await db.medicineGeneric.findFirst({
      where: {
        name: data.name,
      },
    });

    if (generic) {
      return {
        error: "Generic already exists",
      };
    }

    await db.medicineGeneric.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });

    revalidatePath("/dashboard/medicine/generic");

    return {
      success: "Generic created successfully",
    };
  } catch (error) {
    return {
      error: "Failed to create generic",
    };
  }
};

export const DELETE_GENERIC_ACTION = async (id: string) => {
  try {
    const generic = await db.medicineGeneric.findUnique({
      where: {
        id,
      },
    });

    if (!generic) {
      return {
        error: "Generic not found",
      };
    }

    await db.medicineGeneric.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard/medicine/generic");

    return {
      success: "Generic deleted successfully",
    };
  } catch (error) {
    return {
      error: "Failed to delete generic",
    };
  }
};
