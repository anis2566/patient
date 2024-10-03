"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { MedicineSchema, MedicineSchemaType } from "../schema";


export const GET_GENERIC_FOR_MEDICINE = async () => {
  const generics = await db.medicineGeneric.findMany();
  
  return generics;
}

export const GET_MANUFACTURER_FOR_MEDICINE = async () => {
  const manufacturers = await db.medicineManufacturer.findMany();

  return manufacturers;
}


export const CREATE_MEDICINE_ACTION = async (values: MedicineSchemaType) => {
  const { data, success } = MedicineSchema.safeParse(values);

  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  try {
    const medicine = await db.medicine.findFirst({
      where: {
        name: data.name,
        genericName: data.genericName,
        manufacturer: data.manufacturer,
      },
    });

    if (medicine) {
      return {
        error: "Medicine already exists",
      };
    }

    await db.medicine.create({
      data: {
        ...data,
      },
    });

    revalidatePath("/dashboard/medicine");

    return {
      success: "Medicine created successfully",
    };
  } catch (error) {
    return {
      error: "Failed to create medicine",
    };
  }
};
