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
import { TreatmentList } from "./_components/treatment-list";
import { db } from "@/lib/prisma";
import { Header } from "./_components/header";
import { CustomPagination } from "@/components/custom-pagination";

export const metadata: Metadata = {
    title: "HMS | Treatment",
    description: "Hospital Management System",
};

interface Props {
    searchParams: {
        name?: string;
        perPage?: string;
        page?: string;
        sort?: string;
    };
}

const Treatments = async ({ searchParams }: Props) => {
    const { name, perPage = "5", page = "1", sort = "desc" } = searchParams;
    const itemsPerPage = parseInt(perPage);
    const currentPage = parseInt(page);
    const orderBy = sort === "asc" ? "asc" : "desc";

    const [treatments, totalTreatments] = await Promise.all([
        db.treatment.findMany({
            where: {
                ...(name && {
                    title: {
                        contains: name,
                        mode: "insensitive",
                    },
                }),
            },
            orderBy: {
                createdAt: orderBy,
            },
            include: {
                category: true,
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
        }),
        db.treatment.count({
            where: {
                ...(name && {
                    title: {
                        contains: name,
                        mode: "insensitive",
                    },
                }),
            },
        }),
    ]);

    const totalPages = Math.ceil(totalTreatments / itemsPerPage);

    return (
        <ContentLayout title="Treatment">
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
                    <CardTitle>Treatments</CardTitle>
                    <CardDescription>Manage your treatments here</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <TreatmentList treatments={treatments} />
                    <CustomPagination totalPages={totalPages} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Treatments
