"use client"

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog"

import { LoadingButton } from "@/components/loading-button"
import { useDeleteManufacturer } from "@/hooks/use-manufacturer"
import { DELETE_MANUFACTURER_ACTION } from "../action"

export const DeleteManufacturerModal = () => {
    const { open, id, onClose } = useDeleteManufacturer()

    const { mutate: deleteManufacturer, isPending } = useMutation({
        mutationFn: DELETE_MANUFACTURER_ACTION,
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
        deleteManufacturer(id)
    }


    return (
        <AlertDialog open={open && !!id}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this manufacturer and remove your data from our servers.
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
