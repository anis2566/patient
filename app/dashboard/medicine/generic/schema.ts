import { z } from "zod"

export const GenericSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
})

export type GenericSchemaType = z.infer<typeof GenericSchema>