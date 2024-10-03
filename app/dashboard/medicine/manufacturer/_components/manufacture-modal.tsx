"use client"

import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import Image from "next/image"
import { Trash2 } from "lucide-react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { LoadingButton } from "@/components/loading-button"
import { useManufacturer } from "@/hooks/use-manufacturer"
import { CREATE_MANUFACTURER_ACTION } from "../action"
import { ManufacturerSchema, ManufacturerSchemaType } from "../schema"
import { UploadButton } from "@/lib/uploadthing"

export const ManufactureModal = () => {
    const { open, onClose } = useManufacturer()

    const { mutate: createManufacturer, isPending } = useMutation({
        mutationFn: CREATE_MANUFACTURER_ACTION,
        onSuccess: (data) => {
            if (data?.error) {
                toast.error(data?.error);
            } else {
                toast.success(data?.success);
                onClose();
                form.reset();
            }
        },
    })

    const form = useForm<ManufacturerSchemaType>({
        resolver: zodResolver(ManufacturerSchema),
        defaultValues: {
            name: "",
            description: "",
            imageUrl: "",
        },
    })

    const onSubmit = (data: ManufacturerSchemaType) => {
        createManufacturer(data)
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        New Manufacturer
                    </DialogTitle>
                    <DialogDescription>
                        Create a new manufacturer
                    </DialogDescription>
                </DialogHeader>

                <div>
                    <FormProvider {...form}>
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

                            <DialogFooter>
                                <LoadingButton
                                    isLoading={isPending}
                                    title="Create"
                                    loadingTitle="Creating..."
                                    onClick={form.handleSubmit(onSubmit)}
                                    type="submit"
                                />
                            </DialogFooter>

                        </form>
                    </FormProvider>
                </div>
            </DialogContent>
        </Dialog>
    )
}
