import { Treatment, TreatmentCategory } from "@prisma/client";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface TreatmentWithCategory extends Treatment {
    category: TreatmentCategory;
}

interface Props {
    treatments: TreatmentWithCategory[];
}

export const TreatmentList = ({ treatments }: Props) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {treatments.map((treatment) => (
                    <TableRow key={treatment.id}>
                        <TableCell>{treatment.title}</TableCell>
                        <TableCell>{treatment.description}</TableCell>
                        <TableCell>
                            <Badge className="rounded-full">{treatment.category.name}</Badge>
                        </TableCell>
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
                                            href={`/dashboard/treatment/edit/${treatment.id}`}
                                            className="flex items-center gap-x-3"
                                        >
                                            <Pencil className="h-5 w-5" />
                                            Edit
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="group flex items-center gap-x-3 text-rose-500">
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
