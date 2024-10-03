"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { MedicineSchema, MedicineSchemaType } from "../../schema";

type UpdateMedicine = {
  id: string;
  values: MedicineSchemaType;
};

export const UPDATE_MEDICINE_ACTION = async ({
  id,
  values,
}: UpdateMedicine) => {
  const { data, success } = MedicineSchema.safeParse(values);

  if (!success) return { error: "Invalid input values" };

  try {
    const medicine = await db.medicine.findUnique({
      where: { id },
    });

    if (!medicine) return { error: "Medicine not found" };

    await db.medicine.update({
      where: { id },
      data: {
        ...data,
      },
    });

    revalidatePath("/dashboard/medicine");

    return { success: "Medicine updated successfully" };
  } catch (error) {
    return { error: "Failed to update medicine" };
  }
};
