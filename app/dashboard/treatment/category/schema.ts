import { z } from "zod"

export const TreatmentCategorySchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
})

export type TreatmentCategorySchemaType = z.infer<typeof TreatmentCategorySchema>
