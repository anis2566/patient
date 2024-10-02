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

export const metadata: Metadata = {
    title: "HMS | Treatment",
    description: "Hospital Management System",
};

const Treatments = async () => {
    const treatments = await db.treatment.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            category: true,
        },
    });


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
                <CardContent>
                    <TreatmentList treatments={treatments} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Treatments
