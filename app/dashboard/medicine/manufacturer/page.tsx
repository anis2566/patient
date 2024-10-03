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

import { ContentLayout } from "../../_components/content-layout";
import { db } from "@/lib/prisma";
import { CustomPagination } from "@/components/custom-pagination";
import { Header } from "../../treatment/_components/header";
import { NewButton } from "./_components/new-button";
import { ManufacturerList } from "./_components/manufacturer-list";

export const metadata: Metadata = {
    title: "HMS | Medicine | Manufacturer",
    description: "Hospital Management System",
};

interface Props {
    searchParams: {
        perPage?: string;
        page?: string;
        sort?: "asc" | "desc";
        name?: string;
    }
}

const Manufacturer = async ({ searchParams }: Props) => {
    const { perPage = "5", page = "1", sort = "desc", name } = searchParams;
    const itemsPerPage = Number(perPage);
    const currentPage = Number(page);

    const [manufacturers, totalManufacturers] = await Promise.all([
        db.medicineManufacturer.findMany({
            orderBy: {
                createdAt: sort
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
            where: {
                name: name ? {
                    contains: name,
                    mode: "insensitive"
                } : undefined
            }
        }),
        db.medicineManufacturer.count({
            where: {
                name: name ? {
                    contains: name,
                    mode: "insensitive"
                } : undefined
            }
        })
    ]);

    const totalPages = Math.ceil(totalManufacturers / itemsPerPage);

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
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard/medicine/manufacturer">Manufacturer</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Manufacturer</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <NewButton />

            <Card>
                <CardHeader>
                    <CardTitle>Manufacturer</CardTitle>
                    <CardDescription>Manage your medicine manufacturer</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <ManufacturerList manufacturers={manufacturers} />
                    <CustomPagination totalPages={totalPages} />
                </CardContent>
            </Card>
        </ContentLayout>
    );
};

export default Manufacturer;
