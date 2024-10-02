"use client"

import { TreatmentCategoryModal } from "@/app/dashboard/treatment/category/_components/category-modal"
import { DeleteTreatmentCategoryModal } from "@/app/dashboard/treatment/category/_components/delete-modal"
export const ModalProvider = () => {
    return (
        <>
            <TreatmentCategoryModal />
            <DeleteTreatmentCategoryModal />
        </>
    )
}
