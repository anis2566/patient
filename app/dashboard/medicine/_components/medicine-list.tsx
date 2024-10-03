"use client"

import { Medicine, MedicineGeneric, MedicineManufacturer } from "@prisma/client";
import { EllipsisVertical, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { useDeleteMedicine } from "@/hooks/use-medicine";

interface MedicineWithGenericAndManufacturer extends Medicine {
    generic: MedicineGeneric;
    manufacturer: MedicineManufacturer;
}

interface Props {
    medicines: MedicineWithGenericAndManufacturer[];
}

export const MedicineList = ({ medicines }: Props) => {
    const { onOpen } = useDeleteMedicine();
    
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Generic</TableHead>
                    <TableHead>Manufacturer</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {medicines.map((medicine) => (
                    <TableRow key={medicine.id}>
                        <TableCell>{medicine.name}</TableCell>
                        <TableCell>{medicine.generic.name}</TableCell>
                        <TableCell>{medicine.manufacturer.name}</TableCell>
                        <TableCell>{medicine.price}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <EllipsisVertical className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={`/dashboard/medicine/edit/${medicine.id}`}
                                            className="flex items-center gap-x-3"
                                        >
                                            <Edit className="h-5 w-5" />
                                            Edit
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="group flex items-center gap-x-3 text-rose-500" onClick={() => onOpen(medicine.id)}>
                                        <Trash2 className="h-5 w-5 group-hover:text-rose-600" />
                                        <p className="group-hover:text-rose-600">Delete</p>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}