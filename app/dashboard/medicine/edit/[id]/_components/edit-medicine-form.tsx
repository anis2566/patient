"use client"

import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Medicine } from "@prisma/client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { LoadingButton } from "@/components/loading-button";
import { GET_GENERIC_FOR_MEDICINE, GET_MANUFACTURER_FOR_MEDICINE } from "../../../new/action";
import { UPDATE_MEDICINE_ACTION } from "../action";
import { MedicineSchema, MedicineSchemaType } from "../../../schema";

interface Props {
    medicine: Medicine
}

export const EditMedicineForm = ({ medicine }: Props) => {
    const router = useRouter();

    const { data: generics } = useQuery({
        queryKey: ["generics-for-medicine-edit"],
        queryFn: async () => {
            const res = await GET_GENERIC_FOR_MEDICINE()
            return res;
        },
    })

    const { data: manufacturers } = useQuery({
        queryKey: ["manufacturers-for-medicine-edit"],
        queryFn: async () => {
            const res = await GET_MANUFACTURER_FOR_MEDICINE()
            return res;
        },
    })

    const { mutate: updateMedicine, isPending } = useMutation({
        mutationFn: UPDATE_MEDICINE_ACTION,
        onSuccess: (data) => {
            if (data?.error) {
                toast.error(data.error);
            } else {
                toast.success(data?.success);
                router.push("/dashboard/medicine");
            }
        },
    })

    const form = useForm<z.infer<typeof MedicineSchema>>({
        resolver: zodResolver(MedicineSchema),
        defaultValues: {
            name: medicine.name || "",
            description: medicine.description || "",
            genericId: medicine.genericId || "",
            sideEffects: medicine.sideEffects || "",
            manufacturerId: medicine.manufacturerId || "",
            price: medicine.price || undefined,
        },
    });

    const onSubmit = (data: MedicineSchemaType) => {
        updateMedicine({ id: medicine.id, values: data });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Medicine</CardTitle>
                <CardDescription>Edit the medicine details</CardDescription>
            </CardHeader>
            <CardContent>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="genericId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Generic</FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a generic" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {generics?.map((generic) => (
                                                <SelectItem key={generic.id} value={generic.id}>{generic.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sideEffects"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Side Effects</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="manufacturerId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Manufacturer</FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a manufacturer" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {manufacturers?.map((manufacturer) => (
                                                <SelectItem key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" onChange={(e) => field.onChange(parseInt(e.target.value))} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <LoadingButton
                            isLoading={isPending}
                            title="Update"
                            loadingTitle="Updating..."
                            type="submit"
                            onClick={form.handleSubmit(onSubmit)}
                        />
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    )
}