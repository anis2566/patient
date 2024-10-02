"use client"

import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { useTreatmentCategory } from "@/hooks/use-treatment-category"
import { TreatmentCategorySchema, TreatmentCategorySchemaType } from "@/app/dashboard/treatment/category/schema"
import { CREATE_TREATMENT_CATEGORY_ACTION } from "../action"
import { LoadingButton } from "@/components/loading-button"

export const TreatmentCategoryModal = () => {
    const { open, onClose } = useTreatmentCategory()

    const { mutate: createCategory, isPending } = useMutation({
        mutationFn: CREATE_TREATMENT_CATEGORY_ACTION,
        onSuccess: (data) => {
            if (data?.error) {
                toast.error(data.error);
            } else {
                toast.success(data.success);
                onClose();
                form.reset();
            }
        },
    })

    const form = useForm<TreatmentCategorySchemaType>({
        resolver: zodResolver(TreatmentCategorySchema),
        defaultValues: {
            name: "",
            description: "",
        },
    })

    const onSubmit = (data: TreatmentCategorySchemaType) => {
        createCategory(data)
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        New Treatment Category
                    </DialogTitle>
                    <DialogDescription>
                        Create a new treatment category
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
