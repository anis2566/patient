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

import { NewButton } from "./_components/new-button";
import { ContentLayout } from "../../_components/content-layout";
import { CategoryList } from "./_components/category-list";
import { db } from "@/lib/prisma";
import { Header } from "./_components/header";
import { CustomPagination } from "@/components/custom-pagination";

export const metadata: Metadata = {
    title: "HMS | Treatment | Category",
    description: "Hospital Management System",
};

interface Props {
    searchParams: {
        perPage?: string;
        page?: string;
        sort?: "asc" | "desc";
    }
}

const Category = async ({ searchParams }: Props) => {
    const { perPage = "5", page = "1", sort = "asc" } = searchParams;
    const itemsPerPage = Number(perPage);
    const currentPage = Number(page);

    const [categories, totalCategories] = await Promise.all([
        db.treatmentCategory.findMany({
            orderBy: {
                createdAt: sort
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage
        }),
        db.treatmentCategory.count()
    ]);


    const totalPages = Math.ceil(totalCategories / itemsPerPage);

    return (
        <ContentLayout title="Treatment Category">
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
                            <Link href="/dashboard/treatment">Treatment</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Category</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <NewButton />

            <Card>
                <CardHeader>
                    <CardTitle>Category</CardTitle>
                    <CardDescription>Manage your treatment category</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <CategoryList categories={categories} />
                    <CustomPagination totalPages={totalPages} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Category
