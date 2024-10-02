"use server"

import { db } from "@/lib/prisma";

export const GET_DOCTOR_FOR_SELECT = async (name?: string) => {
    const doctors = await db.doctor.findMany({
        where: {
            name: {
                contains: name,
            },
        },
    });

    return doctors
}
