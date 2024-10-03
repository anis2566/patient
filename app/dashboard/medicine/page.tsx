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
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { ContentLayout } from "../_components/content-layout";
import { db } from "@/lib/prisma";
import { MedicineList } from "./_components/medicine-list";
import { Header } from "./_components/header";
import { CustomPagination } from "@/components/custom-pagination";

export const metadata: Metadata = {
    title: "HMS | Medicine",
    description: "Hospital Management System",
};

interface Props {
    searchParams: {
        name?: string;
        generic?: string;
        manufacturer?: string;
        perPage?: string;
        page?: string;
        sort?: "asc" | "desc";
    }
}

const Medicines = async ({ searchParams }: Props) => {
    const { name, generic, manufacturer, perPage = "5", page = "1", sort = "desc" } = searchParams;
    const itemsPerPage = parseInt(perPage);
    const currentPage = parseInt(page);
    const orderBy = sort === "asc" ? "asc" : "desc";

    const [medicines, totalMedicines, generics, manufacturers] = await Promise.all([
        await db.medicine.findMany({
            where: {
                ...(name && { name: { contains: name, mode: "insensitive" } }),
                ...(generic && {
                    generic: {
                        name: generic
                    }
                }),
                ...(manufacturer && {
                    manufacturer: {
                        name: manufacturer
                    }
                }),
            },
            include: {
                generic: true,
                manufacturer: true,
            },
            orderBy: {
                createdAt: orderBy,
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
        }),
        await db.medicine.count({
            where: {
                ...(name && { name: { contains: name, mode: "insensitive" } }),
                ...(generic && {
                    generic: {
                        name: generic
                    }
                }),
                ...(manufacturer && {
                    manufacturer: {
                        name: manufacturer
                    }
                }),
            }
        }),
        await db.medicineGeneric.findMany(),
        await db.medicineManufacturer.findMany(),
    ]);

    const totalPages = Math.ceil(totalMedicines / itemsPerPage);

    return (
        <ContentLayout title="Medicine">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Treatments</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card>
                <CardHeader>
                    <CardTitle>Medicines</CardTitle>
                    <CardDescription>Manage your medicines here</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header generics={generics} manufacturers={manufacturers} />
                    <MedicineList medicines={medicines} />
                    <CustomPagination totalPages={totalPages} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Medicines
