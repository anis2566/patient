import React from "react";
import { redirect } from "next/navigation";

import { ContentLayout } from "../../_components/content-layout";
import { BackButton } from "./_componnets/back-button";
import { Sidebar } from "./_componnets/sidebar";
import { db } from "@/lib/prisma";

interface Props {
  children: React.ReactNode;
  params: {
    id: string;
  };
}

const PatientProfileLayout = async ({ children, params: { id } }: Props) => {
  const patient = await db.patient.findUnique({
    where: {
      id,
    },
  });

  if (!patient) return redirect("/dashboard/patient");

  return (
    <ContentLayout title="Patient">
      <BackButton />
      <div className="flex gap-x-4">
        <div className="flex-shrink-0 md:w-[280px]">
          <Sidebar patient={patient} patientId={id} />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </ContentLayout>
  );
};

export default PatientProfileLayout;
