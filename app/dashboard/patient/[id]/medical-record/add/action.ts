"use server";

import { db } from "@/lib/prisma";

export const GET_DOCTOR_FOR_SELECT = async (name?: string) => {
  const doctors = await db.doctor.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive",
      },
    },
  });
  return doctors;
};

export const GET_TREATMENT_FOR_SELECT = async (title?: string) => {
  const treatments = await db.treatment.findMany({
    where: {
      title: {
        contains: title,
        mode: "insensitive",
      },
    },
  });
  return treatments;
};

export const GET_MEDICINE_FOR_SELECT = async () => {
  const medicines = await db.medicine.findMany({});
  return medicines;
};
