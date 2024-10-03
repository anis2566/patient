"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { ManufacturerSchema, ManufacturerSchemaType } from "./schema";

export const CREATE_MANUFACTURER_ACTION = async (
  values: ManufacturerSchemaType,
) => {
  const { data, success } = ManufacturerSchema.safeParse(values);

  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  try {
    const manufacturer = await db.medicineManufacturer.findFirst({
      where: {
        name: data.name,
      },
    });

    if (manufacturer) {
      return {
        error: "Manufacturer already exists",
      };
    }

    await db.medicineManufacturer.create({
      data: {
        ...data,
      },
    });

    revalidatePath("/dashboard/medicine/manufacturer");

    return {
      success: "Manufacturer created successfully",
    };
  } catch (error) {
    return {
      error: "Failed to create manufacturer",
    };
  }
};

export const DELETE_MANUFACTURER_ACTION = async (id: string) => {
  try {
    const manufacturer = await db.medicineManufacturer.findUnique({
      where: {
        id,
      },
    });

    if (!manufacturer) {
      return {
        error: "Manufacturer not found",
      };
    }

    await db.medicineManufacturer.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard/medicine/manufacturer");

    return {
      success: "Manufacturer deleted successfully",
    };
  } catch (error) {
    return {
      error: "Failed to delete manufacturer",
    };
  }
};
