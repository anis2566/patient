"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";

export const DELETE_MEDICINE_ACTION = async (id: string) => {
  try {
    const medicine = await db.medicine.findUnique({
      where: {
        id,
      },
    });

    if (!medicine) return { error: "Medicine not found" };

    await db.medicine.delete({
      where: { id },
    });

    revalidatePath("/dashboard/medicine");

    return { success: "Medicine deleted successfully" };
  } catch (error) {
    return { error: "Failed to delete medicine" };
  }
};
