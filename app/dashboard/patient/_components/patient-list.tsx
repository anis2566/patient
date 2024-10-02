import { EllipsisVertical, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { Patient } from "@prisma/client";
import { format } from "date-fns";

import {
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableBody,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { calculateAge } from "@/lib/utils";
import { EmptyData } from "@/components/empty-data";

interface Props {
  patients: Patient[];
}

export const PatientList = ({ patients }: Props) => {
  if (patients.length === 0) {
    return <EmptyData message="No patients found" />;
  }
  return (
    <Table>
      <TableHeader className="bg-accent">
        <TableRow>
          <TableHead>Patient</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Blood Group</TableHead>
          <TableCell>Created At</TableCell>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id}>
            <TableCell>
              <div className="flex items-center gap-x-2">
                <Avatar>
                  <AvatarImage src={patient.imageUrl ?? ""} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {patient.phone}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell>{calculateAge(patient.dob)}</TableCell>
            <TableCell>
              <Badge>{patient.gender}</Badge>
            </TableCell>
            <TableCell>
              {patient?.bloodGroup ? patient?.bloodGroup : "-"}
            </TableCell>
            <TableCell>
              {format(patient.createdAt, "dd MMM yyyy, hh:mm a")}
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
                      href={`/dashboard/patient/${patient.id}`}
                      className="flex items-center gap-x-3"
                    >
                      <Eye className="h-5 w-5" />
                      View
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
  );
};
