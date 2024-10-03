"use client"

import { MedicineManufacturer } from "@prisma/client"
import { Trash2 } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { useDeleteManufacturer } from "@/hooks/use-manufacturer"

interface Props {
    manufacturers: MedicineManufacturer[]
}

export const ManufacturerList = ({ manufacturers }: Props) => {
    const { onOpen } = useDeleteManufacturer()
    return (
        <Table>
            <TableHeader>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Action</TableHead>
            </TableHeader>
            <TableBody>
                {manufacturers.map((manufacturer) => (
                    <TableRow key={manufacturer.id}>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src={manufacturer.imageUrl ?? ""} />
                                <AvatarFallback>
                                    {manufacturer.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>{manufacturer.name}</TableCell>
                        <TableCell>{manufacturer.description}</TableCell>
                        <TableCell>
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button size="icon" variant="ghost" className="group flex items-center gap-x-3" onClick={() => onOpen(manufacturer.id)}>
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
