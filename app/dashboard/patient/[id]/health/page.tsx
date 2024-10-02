import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { db } from "@/lib/prisma";
import { HealthForm } from "./_components/health-form";

export const metadata: Metadata = {
    title: "HMS | Patient | Health",
    description: "Hospital Management System",
};

interface Props {
    params: {
        id: string;
    };
}

const PatientHealth = async ({ params }: Props) => {
    const patient = await db.patient.findUnique({
        where: {
            id: params.id,
        },
    });

    if (!patient) return redirect("/dashboard/patient");

    return (
        <Card>
            <CardHeader>
                <CardTitle>Patient Health</CardTitle>
                <CardDescription>View and manage the patient&apos;s health.</CardDescription>
            </CardHeader>
            <CardContent>
                <HealthForm patient={patient} />
            </CardContent>
        </Card>
    )
}

export default PatientHealth;
