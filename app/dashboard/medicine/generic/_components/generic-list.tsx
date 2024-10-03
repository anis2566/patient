"use client"

import { Trash2 } from "lucide-react"
import { MedicineGeneric } from "@prisma/client"

import { Table, TableHeader, TableBody, TableHead, TableCell, TableRow } from "@/components/ui/table"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

import { useDeleteGeneric } from "@/hooks/use-generic"

interface GenericListProps {
    generics: MedicineGeneric[]
}

export const GenericList = ({ generics }: GenericListProps) => {
    const { onOpen } = useDeleteGeneric()

    return (
        <Table>
            <TableHeader>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
            </TableHeader>
            <TableBody>
                {generics.map((generic) => (
                    <TableRow key={generic.id}>
                        <TableCell>{generic.name}</TableCell>
                        <TableCell>{generic.description}</TableCell>
                        <TableCell>
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button size="icon" variant="ghost" className="group flex items-center gap-x-3" onClick={() => onOpen(generic.id)}>
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