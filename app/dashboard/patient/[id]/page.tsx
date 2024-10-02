import Link from "next/link";
import type { Metadata } from "next";
import { ContentLayout } from "../../_components/content-layout";
import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { BackButton } from "./_componnets/back-button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "HMS | Patient | Profile",
  description: "Hospital Management System",
};

const PatientProfile = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Record</CardTitle>
        <CardDescription>
          View and manage the patient&apos;s comprehensive medical history.
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default PatientProfile;
