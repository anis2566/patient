import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { db } from "@/lib/prisma";
import { ContentLayout } from "@/app/dashboard/_components/content-layout";
import { TreatmentForm } from "./_components/edit-treatment-form";


export const metadata: Metadata = {
    title: "HMS | Treatment | Edit",
    description: "Hospital Management System",
};

interface Props {
    params: {
        id: string;
    }
}

const EditTreatment = async ({ params: { id } }: Props) => {
    const treatment = await db.treatment.findUnique({
        where: {
            id
        }
    })

    if (!treatment) return redirect("/dashboard/treatment");

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
                        <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <TreatmentForm treatment={treatment} />
        </ContentLayout>
    )
}

export default EditTreatment
