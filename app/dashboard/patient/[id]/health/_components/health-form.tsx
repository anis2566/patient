"use client";

import { BloodGroup, Patient } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { PatientHealthSchema, PatientHealthSchemaType } from "../schema";
import { UPDATE_PATIENT_HEALTH } from "../action";

interface Props {
    patient: Patient
}

export const HealthForm = ({ patient }: Props) => {

    useEffect(() => {
        if (patient.bloodGroup) {
            form.setValue("bloodGroup", patient.bloodGroup)
        }
    }, [patient])

    const { mutate: updatePatientHealth, isPending } = useMutation({
        mutationFn: UPDATE_PATIENT_HEALTH,
        onSuccess: (data) => {
            if (data?.error) {
                toast.error(data.error);
            } else {
                toast.success(data.success);
            }
        },
    })

    const form = useForm<PatientHealthSchemaType>({
        resolver: zodResolver(PatientHealthSchema),
        defaultValues: {
            bloodGroup: patient.bloodGroup || undefined,
            height: undefined,
            weight: undefined,
            allergies: "",
            habits: "",
        }
    })

    const onSubmit = (values: PatientHealthSchemaType) => {
        updatePatientHealth({
            patientId: patient.id,
            values
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="bloodGroup"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Blood Group</FormLabel>
                            <Select
                                onValueChange={(value) => field.onChange(value as BloodGroup)}
                                defaultValue={field.value}
                                disabled={isPending}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a blood group" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.values(BloodGroup).map((bloodGroup) => (
                                        <SelectItem key={bloodGroup} value={bloodGroup}>
                                            {bloodGroup}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Height</FormLabel>
                            <FormControl>
                                <Input {...field} type="number" onChange={(e) => field.onChange(parseInt(e.target.value))} placeholder="5.5 fit" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Weight</FormLabel>
                            <FormControl>
                                <Input {...field} type="number" onChange={(e) => field.onChange(parseInt(e.target.value))} placeholder="60 kg" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="allergies"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Allergies</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder="beans, nuts, etc." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="habits"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Habits</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder="smoking, drinking, etc." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    disabled={isPending}
                    className="flex items-center gap-x-3"
                >
                    {isPending && <Loader2 className="h-4 animate-spin w-4" />}
                    {isPending ? "Saving..." : "Save"}
                </Button>
            </form>
        </Form>
    )
}
