"use client"

import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { GET_DOCTOR_FOR_SELECT, GET_MEDICINE_FOR_SELECT, GET_TREATMENT_FOR_SELECT } from "./action";
import { useQueries, useQuery } from "@tanstack/react-query";
import { MedicalRecordSchema } from "../schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckIcon, Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MedicineFrequency, MedicineInstruction } from "@prisma/client";
import { formatString } from "@/lib/utils";
import { MedicineForm } from "@/app/dashboard/medicine/new/_components/medicine-form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


type Doctor = {
    id: string;
    name: string;
    imageUrl: string | null;
}

type MedicineRecord = {
    medicineId: string;
    medicineName: string;
    quantity: number;
    instruction: MedicineInstruction;
    frequency: MedicineFrequency;
}

const AddMedicalRecord = () => {
    const [open, setOpen] = useState(false);
    const [openTreatment, setOpenTreatment] = useState(false);
    const [search, setSearch] = useState("");
    const [searchTreatment, setSearchTreatment] = useState("");
    const [newMedicine, setNewMedicine] = useState<MedicineRecord>({
        medicineId: "",
        medicineName: "",
        quantity: 1,
        instruction: MedicineInstruction.AsNeeded,
        frequency: MedicineFrequency.OnceADay,
    });
    const [selectedMedicines, setSelectedMedicines] = useState<MedicineRecord[]>([]);

    // Use useQueries to fetch both doctors and treatments
    const results = useQueries({
        queries: [
            {
                queryKey: ["doctors-for-medical-record-add"],
                queryFn: async () => {
                    const res = await GET_DOCTOR_FOR_SELECT(search);
                    return res;
                },
            },
            {
                queryKey: ["treatments-for-medical-record-add", searchTreatment],
                queryFn: async () => {
                    const res = await GET_TREATMENT_FOR_SELECT(searchTreatment);
                    return res;
                },
            },
            {
                queryKey: ["medicines-for-medical-record-add"],
                queryFn: async () => {
                    const res = await GET_MEDICINE_FOR_SELECT();
                    return res;
                },
            },
        ]
    });

    const doctors = results[0].data;
    const treatments = results[1].data;
    const medicines = results[2].data;
    const form = useForm<z.infer<typeof MedicalRecordSchema>>({
        resolver: zodResolver(MedicalRecordSchema),
        defaultValues: {
            complains: "",
            diagnosis: "",
            vitalSigns: "",
            treatmentId: "",
            doctorId: "",
            medicines: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "medicines"
    });

    const onSubmit = (data: z.infer<typeof MedicalRecordSchema>) => {
        console.log(data);
    };

    const handleNewMedicineChange = (field: keyof MedicineRecord, value: string) => {
        setNewMedicine(prev => ({ ...prev, [field]: value }));
    };

    const submitNewMedicine = () => {
        const { medicineName, ...rest } = newMedicine;
        append(rest);
        setOpen(false);
        setSelectedMedicines(prev => [...prev, newMedicine]);
        setNewMedicine({
            medicineId: "",
            medicineName: "",
            quantity: 1,
            instruction: MedicineInstruction.AsNeeded,
            frequency: MedicineFrequency.OnceADay,
        });
    };

    const handleRemoveMedicine = (id: string, index: number) => {
        remove(index);
        setSelectedMedicines(prev => prev.filter(medicine => medicine.medicineId !== id));
    };

    console.log(form.getValues("medicines"));
    console.log(selectedMedicines);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add Medical Record</CardTitle>
                <CardDescription>Add a new medical record for the patient</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="doctorId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Doctor</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a doctor" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {doctors?.map((doctor) => (
                                                <SelectItem key={doctor.id} value={doctor.id}>{doctor.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="complains"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Complains</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="diagnosis"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Diagnosis</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="vitalSigns"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Vital Signs</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="treatmentId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Treatment</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a treatment" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {treatments?.map((treatment) => (
                                                <SelectItem key={treatment.id} value={treatment.id}>{treatment.title}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Card>
                            <CardHeader>
                                <CardTitle>Medicines</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger asChild>
                                        <Button type="button" variant="outline" className="ml-auto flex">Add Medicine</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Add Medicine</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                            <Select
                                                value={newMedicine.medicineId}
                                                onValueChange={(value) => {
                                                    const medicine = medicines?.find(medicine => medicine.id === value);
                                                    if (medicine) {
                                                        handleNewMedicineChange('medicineName', medicine.name);
                                                        handleNewMedicineChange('medicineId', medicine.id);
                                                    }
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a medicine" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {medicines?.map(medicine => (
                                                        <SelectItem key={medicine.id} value={medicine.id}>{medicine.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <Input
                                                type="number"
                                                value={newMedicine.quantity}
                                                onChange={(e) => handleNewMedicineChange('quantity', e.target.value)}
                                            />
                                            <Select
                                                value={newMedicine.instruction}
                                                onValueChange={(value) => handleNewMedicineChange('instruction', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a instruction" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Object.values(MedicineInstruction).map(instruction => (
                                                        <SelectItem key={instruction} value={instruction}>{instruction}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <Select
                                                value={newMedicine.frequency}
                                                onValueChange={(value) => handleNewMedicineChange('frequency', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a frequency" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Object.values(MedicineFrequency).map(frequency => (
                                                        <SelectItem key={frequency} value={frequency}>{frequency}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <Button type="button" onClick={submitNewMedicine}>Add to Record</Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>

                                <Table>
                                    <TableHeader>
                                        <TableHead>Medicine</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Instruction</TableHead>
                                        <TableHead>Frequency</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            selectedMedicines.map((medicine, index) => (
                                                <TableRow key={medicine.medicineId}>
                                                    <TableCell>{medicine.medicineName}</TableCell>
                                                    <TableCell>{medicine.quantity}</TableCell>
                                                    <TableCell>{formatString(medicine.instruction)}</TableCell>
                                                    <TableCell>{formatString(medicine.frequency)}</TableCell>
                                                    <TableCell>
                                                        <TooltipProvider delayDuration={0}>
                                                            <Tooltip>
                                                                <TooltipTrigger>
                                                                    <Button variant="ghost" size="icon" onClick={() => handleRemoveMedicine(medicine.medicineId, index)}>
                                                                        <Trash className="w-4 h-4 text-red-500" />
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>Remove Medicine</TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default AddMedicalRecord
