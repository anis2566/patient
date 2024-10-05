"use client"

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog"

import { LoadingButton } from "@/components/loading-button"
import { useMedicalRecord } from "@/hooks/use-medical-record"
import { DELETE_MEDICAL_RECORD_ACTION } from "../action"

export const DeleteMedicalRecordModal = () => {
    const { open, id, onClose } = useMedicalRecord()

    const { mutate: deleteMedicalRecord, isPending } = useMutation({
        mutationFn: DELETE_MEDICAL_RECORD_ACTION,
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
        deleteMedicalRecord(id)
    }


    return (
        <AlertDialog open={open && !!id}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this medical record and remove your data from our servers.
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
