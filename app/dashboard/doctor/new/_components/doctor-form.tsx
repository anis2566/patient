"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { DoctorSchema, DoctorSchemaType } from "../../schema";
import { UploadButton } from "@/lib/uploadthing";
import { CREATE_DOCTOR_ACTION } from "../action";

export const DoctorForm = () => {
    const router = useRouter();
    const { mutate: createDoctor, isPending } = useMutation({
        mutationFn: CREATE_DOCTOR_ACTION,
        onSuccess: (data) => {
            if (data?.error) {
                toast.error(data.error);
            } else {
                toast.success(data.success);
                router.push("/dashboard/doctor");
                form.reset();
            }
        },
    });

    const form = useForm<DoctorSchemaType>({
        resolver: zodResolver(DoctorSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
            imageUrl: "",
        },
    });

    const onSubmit = (values: DoctorSchemaType) => {
        createDoctor(values);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add Doctor</CardTitle>
                <CardDescription>Add a new doctor to the system</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        {form.getValues("imageUrl") ? (
                                            <div className="relative">
                                                <Image
                                                    alt="Upload"
                                                    width={80}
                                                    height={80}
                                                    className="h-14 w-14 rounded-full"
                                                    src={form.getValues("imageUrl") || ""}
                                                />
                                                <Button
                                                    className="absolute right-0 top-0"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => form.setValue("imageUrl", "")}
                                                    type="button"
                                                    disabled={isPending}
                                                >
                                                    <Trash2 className="text-rose-500" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <UploadButton
                                                endpoint="imageUploader"
                                                onClientUploadComplete={(res) => {
                                                    field.onChange(res[0].url);
                                                    toast.success("Image uploaded");
                                                }}
                                                onUploadError={(error: Error) => {
                                                    toast.error("Image upload failed");
                                                }}
                                            />
                                        )}
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
                            {isPending ? "Loading..." : "Create"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
