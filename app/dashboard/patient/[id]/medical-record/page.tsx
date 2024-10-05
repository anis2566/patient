import Link from 'next/link'
import React from 'react'
import { PlusIcon } from 'lucide-react'
import { Metadata } from 'next'

import { buttonVariants } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { cn } from '@/lib/utils'
import { db } from '@/lib/prisma'
import { RecordList } from './_components/record-list'
import { CustomPagination } from '@/components/custom-pagination'

export const metadata: Metadata = {
    title: "HMS | Patient | Medical Record",
    description: "Hospital Management System",
};

interface Props {
    params: {
        id: string
    },
    searchParams: {
        page: string
    }
}

const MedicalRecord = async ({ params: { id }, searchParams: { page = "1" } }: Props) => {
    const itemPerPage = 3
    const currentPage = parseInt(page)

    const [medicalRecords, totalMedicalRecords] = await Promise.all([
        db.medicalRecord.findMany({
            where: {
                patientId: id
            },
            include: {
                treatments: {
                    include: {
                        treatment: true
                    }
                },
                medicines: {
                    include: {
                        medicine: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            skip: (currentPage - 1) * itemPerPage,
            take: itemPerPage
        }),
        db.medicalRecord.count({
            where: {
                patientId: id
            }
        })
    ])

    const totalPages = Math.ceil(totalMedicalRecords / itemPerPage)

    return (
        <div className='space-y-4'>
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link href={`/dashboard/patient/${id}/medical-record/add`} className={cn(buttonVariants({ variant: "default" }), "flex items-center gap-x-3 max-w-fit")}>
                            <PlusIcon className='w-4 h-4' />
                            Add
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side='top'>
                        Add a new medical record
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <Card>
                <CardHeader>
                    <CardTitle>Medical Record</CardTitle>
                    <CardDescription>View and manage the patient&apos;s medical record.</CardDescription>
                </CardHeader>
                <CardContent>
                    <RecordList medicalRecords={medicalRecords} />
                    <CustomPagination totalPages={totalPages} />
                </CardContent>
            </Card>
        </div>
    )
}

export default MedicalRecord
