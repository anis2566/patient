import type { Metadata } from "next";
import { redirect } from "next/navigation";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { PatientForm } from "./_componnets/profile-form";
import { db } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "HMS | Patient | Profile",
  description: "Hospital Management System",
};

interface Props {
  params: {
    id: string;
  };
}

const PatientProfile = async ({ params }: Props) => {
  const patient = await db.patient.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!patient) return redirect("/dashboard/patient");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Profile</CardTitle>
        <CardDescription>
          View and manage the patient&apos;s profile.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PatientForm patient={patient} />
      </CardContent>
    </Card>
  );
};

export default PatientProfile;
