"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { MedicalRecordSchema, MedicalRecordSchemaType } from "../schema";

export const GET_DOCTOR_FOR_SELECT = async () => {
  const doctors = await db.doctor.findMany({});
  return doctors;
};

export const GET_TREATMENT_FOR_SELECT = async () => {
  const treatments = await db.treatment.findMany({});
  return treatments;
};

export const GET_MEDICINE_FOR_SELECT = async () => {
  const medicines = await db.medicine.findMany({});
  return medicines;
};

type MedicalRecord = {
  patientId: string;
  values: MedicalRecordSchemaType;
};

export const CREATE_MEDICAL_RECORD_ACTION = async ({
  patientId,
  values,
}: MedicalRecord) => {
  const { data, success } = MedicalRecordSchema.safeParse(values);
  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  try {
    const medicalRecord = await db.medicalRecord.findFirst({
      where: {
        patientId: patientId,
      },
    });

    if (medicalRecord) {
      return {
        error: "Medical record already exists",
      };
    }

    const formatedMedicines = data.medicines.map((medicine) => ({
      medicineId: medicine.medicineId,
      quantity: medicine.quantity,
      instruction: medicine.instruction,
      frequency: medicine.frequency,
    }));

    await db.medicalRecord.create({
      data: {
        ...data,
        patientId: patientId,
        medicines: {
          createMany: {
            data: formatedMedicines,
          },
        },
        treatments: {
          createMany: {
            data:
              data?.treatments?.map((treatment) => ({
                treatmentId: treatment,
              })) || [],
          },
        },
      },
    });

    revalidatePath(`/dashboard/patient/${patientId}/medical-record`);

    return {
      success: "Medical record created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create medical record",
    };
  }
};
