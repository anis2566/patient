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
import { NewButton } from "./_components/new-button";
import { db } from "@/lib/prisma";
import { GenericList } from "./_components/generic-list";
import { CustomPagination } from "@/components/custom-pagination";
import { Header } from "../../treatment/_components/header";


export const metadata: Metadata = {
    title: "HMS | Medicine | Generic",
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

const Generic = async ({ searchParams }: Props) => {
    const { perPage = "5", page = "1", sort = "desc", name } = searchParams;
    const itemsPerPage = Number(perPage);
    const currentPage = Number(page);

    const [generics, totalGenerics] = await Promise.all([
        db.medicineGeneric.findMany({
            where: {
                ...(name && { name: { contains: name, mode: "insensitive" } })
            },
            orderBy: {
                createdAt: sort
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage
        }),
        db.medicineGeneric.count({
            where: {
                ...(name && { name: { contains: name, mode: "insensitive" } })
            }
        })
    ])

    const totalPages = Math.ceil(totalGenerics / itemsPerPage);

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
                            <Link href="/dashboard/medicine">Medicine</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Generic</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <NewButton />

            <Card>
                <CardHeader>
                    <CardTitle>Generic</CardTitle>
                    <CardDescription>Manage your medicine generic</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <GenericList generics={generics} />
                    <CustomPagination totalPages={totalPages} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Generic
