import Link from 'next/link'
import React from 'react'
import { PlusIcon } from 'lucide-react'
import { Metadata } from 'next'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

import { db } from '@/lib/prisma'

export const metadata: Metadata = {
  title: "HMS | Patient | Appoinments",
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

const Appoinments = async ({ params: { id }, searchParams: { page = "1" } }: Props) => {
  const itemPerpage = 5;
  const currentPage = parseInt(page);

  const [totalItems, appointments] = await Promise.all([
    db.appointment.count({
      where: {
        patientId: id
      }
    }),
    db.appointment.findMany({
      where: {
        patientId: id
      },
      include: {
        doctor: true
      },
      orderBy: {
        createdAt: "desc"
      },
      skip: (currentPage - 1) * itemPerpage,
      take: itemPerpage
    })
  ]);

  const totalPages = Math.ceil(totalItems / itemPerpage);

  return (
    <div className='space-y-4'>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>
              <Link href={`/dashboard/patient/${id}/appointment/add`} className="flex items-center gap-x-3 max-w-fit">
                <PlusIcon className='w-4 h-4' />
                New
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side='top'>
            Add a new appointment
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Card>
        <CardHeader>
          <CardTitle>Appointments</CardTitle>
          <CardDescription>Manage your appointments</CardDescription>
        </CardHeader>
        <CardContent>

        </CardContent>
      </Card>
    </div>
  )
}

export default Appoinments
