"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { AppointmentSchema, AppointmentSchemaType } from "./schema";

type CreateAppoinment = {
  patientId: string;
  values: AppointmentSchemaType;
};

export const CREATE_APPOINMENT_ACTION = async ({
  values,
  patientId,
}: CreateAppoinment) => {
  const { data, success } = AppointmentSchema.safeParse(values);

  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  try {
    const appointment = await db.appointment.findFirst({
      where: {
        date: data.date,
        doctorId: data.doctorId,
        startTime: data.startTime,
        endTime: data.endTime,
      },
    });

    if (appointment) {
      return {
        error: "Appointment already exists",
      };
    }

    await db.appointment.create({
      data: {
        ...data,
        patientId,
      },
    });

    revalidatePath(`/dashboard/patient/${patientId}/appointment`);

    return {
      success: "Appointment created successfully",
    };
  } catch (error) {
    return {
      error: "Failed to create appointment",
    };
  }
};
