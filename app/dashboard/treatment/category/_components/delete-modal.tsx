"use client"

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog"

import { useDeleteTreatmentCategory } from "@/hooks/use-treatment-category"

import { DELETE_TREATMENT_CATEGORY_ACTION } from "../action"
import { LoadingButton } from "@/components/loading-button"

export const DeleteTreatmentCategoryModal = () => {
    const { open, id, onClose } = useDeleteTreatmentCategory()

    const { mutate: deleteCategory, isPending } = useMutation({
        mutationFn: DELETE_TREATMENT_CATEGORY_ACTION,
        onSuccess: (data) => {
            if (data?.error) {
                toast.error(data.error);
                onClose();
            } else {
                toast.success(data.success);
                onClose();
            }
        },
    })

    const handleDelete = () => {
        deleteCategory(id)
    }


    return (
        <AlertDialog open={open && !!id}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this category and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose} disabled={isPending}>Cancel</AlertDialogCancel>
                    <LoadingButton
                        isLoading={isPending}
                        title="Continue"
                        loadingTitle="Deleting..."
                        onClick={handleDelete}
                        type="button"
                        variant="destructive"
                    />
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
