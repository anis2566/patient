"use client"

import { TreatmentCategoryModal } from "@/app/dashboard/treatment/category/_components/category-modal"
import { DeleteTreatmentCategoryModal } from "@/app/dashboard/treatment/category/_components/delete-modal"
import { GenericModal } from "@/app/dashboard/medicine/generic/_components/generic-modal"
import { DeleteGenericModal } from "@/app/dashboard/medicine/generic/_components/delete-modal"
import { ManufactureModal } from "@/app/dashboard/medicine/manufacturer/_components/manufacture-modal"
import { DeleteManufacturerModal } from "@/app/dashboard/medicine/manufacturer/_components/delete-modal"
import { DeleteMedicineModal } from "@/app/dashboard/medicine/_components/delete-modal"
export const ModalProvider = () => {
    return (
        <>
            <TreatmentCategoryModal />
            <DeleteTreatmentCategoryModal />
            <GenericModal />
            <DeleteGenericModal />
            <ManufactureModal />
            <DeleteManufacturerModal />
            <DeleteMedicineModal />
        </>
    )
}
