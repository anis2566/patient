"use client"

import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useGeneric } from "@/hooks/use-generic"

export const NewButton = () => {
    const { onOpen } = useGeneric()

    return (
        <Button onClick={onOpen}>
            <PlusCircle className="w-4 h-4 mr-2" />
            New
        </Button>
    )
}