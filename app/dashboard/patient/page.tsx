import Link from "next/link";
import type { Metadata } from "next";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { ContentLayout } from "../_components/content-layout";
import { db } from "@/lib/prisma";
import { PatientList } from "./_components/patient-list";
import { Header } from "./_components/header";
import { CustomPagination } from "@/components/custom-pagination";

export const metadata: Metadata = {
  title: "HMS | Patients",
  description: "Hospital Management System",
};

interface Props {
  searchParams: {
    page: string;
    perPage: string;
    name?: string;
    phone?: string;
    date?: Date;
    sort?: "asc" | "desc";
  };
}

const Patients = async ({ searchParams }: Props) => {
  const {
    page = "1",
    perPage = "5",
    name,
    phone,
    date: dateString,
    sort,
  } = searchParams;
  const currentPage = parseInt(page, 10);
  const currentPerPage = parseInt(perPage, 10);

  const date = dateString ? new Date(dateString) : null;

  const [patients, totalPatients] = await Promise.all([
    db.patient.findMany({
      where: {
        ...(name && {
          name: {
            contains: name,
            mode: "insensitive",
          },
        }),
        ...(phone && {
          phone: {
            contains: phone,
            mode: "insensitive",
          },
        }),
        ...(date && {
          createdAt: {
            gte: new Date(date.setHours(0, 0, 0, 0)),
            lt: new Date(date.setHours(23, 59, 59, 999)),
          },
        }),
      },
      orderBy: {
        createdAt: sort === "asc" ? "asc" : "desc",
      },
      skip: (currentPage - 1) * currentPerPage,
      take: currentPerPage,
    }),
    db.patient.count({
      where: {
        ...(name && {
          name: {
            contains: name,
            mode: "insensitive",
          },
        }),
        ...(phone && {
          phone: {
            contains: phone,
            mode: "insensitive",
          },
        }),
        ...(date && {
          createdAt: {
            gte: new Date(date.setHours(0, 0, 0, 0)),
            lt: new Date(date.setHours(23, 59, 59, 999)),
          },
        }),
      },
    }),
  ]);

  const totalPages = Math.ceil(totalPatients / currentPerPage);

  return (
    <ContentLayout title="Patient">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Patients</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <CardTitle>Patients</CardTitle>
          <CardDescription>List of all patients</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Header />
          <PatientList patients={patients} />
          <CustomPagination totalPages={totalPages} />
        </CardContent>
      </Card>
    </ContentLayout>
  );
};

export default Patients;
