"use client"

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog"

import { LoadingButton } from "@/components/loading-button"
import { useDeleteMedicine } from "@/hooks/use-medicine"
import { DELETE_MEDICINE_ACTION } from "../action"

export const DeleteMedicineModal = () => {
    const { open, id, onClose } = useDeleteMedicine()

    const { mutate: deleteMedicine, isPending } = useMutation({
        mutationFn: DELETE_MEDICINE_ACTION,
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
        deleteMedicine(id)
    }


    return (
        <AlertDialog open={open && !!id}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this medicine and remove your data from our servers.
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
