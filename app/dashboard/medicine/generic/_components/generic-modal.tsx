"use client"

import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { useGeneric } from "@/hooks/use-generic"
import { GenericSchema, GenericSchemaType } from "@/app/dashboard/medicine/generic/schema"
import { LoadingButton } from "@/components/loading-button"
import { CREATE_GENERIC_ACTION } from "../action"

export const GenericModal = () => {
    const { open, onClose } = useGeneric()

    const { mutate: createGeneric, isPending } = useMutation({
        mutationFn: CREATE_GENERIC_ACTION,
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

    const form = useForm<GenericSchemaType>({
        resolver: zodResolver(GenericSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    })

    const onSubmit = (data: GenericSchemaType) => {
        createGeneric(data)
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        New Generic
                    </DialogTitle>
                    <DialogDescription>
                        Create a new generic
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
