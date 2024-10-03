"use client"

import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useManufacturer } from "@/hooks/use-manufacturer"

export const NewButton = () => {
    const { onOpen } = useManufacturer()

    return (
        <Button onClick={onOpen}>
            <PlusCircle className="w-4 h-4 mr-2" />
            New
        </Button>
    )
}