"use client"

import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useTreatmentCategory } from "@/hooks/use-treatment-category"

export const NewButton = () => {
    const { onOpen } = useTreatmentCategory()

    return (
        <Button onClick={onOpen}>
            <PlusCircle className="w-4 h-4 mr-2" />
            New
        </Button>
    )
}