import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { ContentLayout } from "@/app/dashboard/_components/content-layout";
import { db } from "@/lib/prisma";
import { EditMedicineForm } from "./_components/edit-medicine-form";

export const metadata: Metadata = {
    title: "HMS | Medicine | Edit",
    description: "Hospital Management System",
};

interface Props {
    params: {
        id: string;
    }
}

const EditMedicine = async ({ params: { id } }: Props) => {
    const medicine = await db.medicine.findUnique({
        where: {
            id,
        },
    });

    if (!medicine) return redirect("/dashboard/medicine");

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
                        <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <EditMedicineForm medicine={medicine} />
        </ContentLayout>
    )
}

export default EditMedicine
