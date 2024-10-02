"use client"

import { TreatmentCategory } from "@prisma/client"
import { Trash2 } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { useDeleteTreatmentCategory } from "@/hooks/use-treatment-category"

interface Props {
    categories: TreatmentCategory[]
}

export const CategoryList = ({ categories }: Props) => {
    const { onOpen } = useDeleteTreatmentCategory()

    return (
        <Table>
            <TableHeader>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
            </TableHeader>
            <TableBody>
                {categories.map((category) => (
                    <TableRow key={category.id}>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>{category.description}</TableCell>
                        <TableCell>
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button size="icon" variant="ghost" className="group flex items-center gap-x-3" onClick={() => onOpen(category.id)}>
                                            <Trash2 className="h-5 w-5 text-rose-500 group-hover:text-rose-600" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Delete</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
