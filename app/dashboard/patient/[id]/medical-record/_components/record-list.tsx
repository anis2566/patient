"use client"

import { format } from "date-fns"
import { Eye, Trash2 } from "lucide-react"
import { MedicalRecord, MedicalRecordMedicine, MedicalRecordTreatment, Medicine, Treatment } from "@prisma/client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useMedicalRecord } from "@/hooks/use-medical-record"

interface MedicalRecordTreatmentWithTreatment extends MedicalRecordTreatment {
    treatment: Treatment
}

interface MedicalRecordMedicineWithMedicine extends MedicalRecordMedicine {
    medicine: Medicine
}

interface MedicalRecordWithTreatmentAndMedicine extends MedicalRecord {
    treatments: MedicalRecordTreatmentWithTreatment[]
    medicines: MedicalRecordMedicineWithMedicine[]
}

interface Props {
    medicalRecords: MedicalRecordWithTreatmentAndMedicine[]
}

export const RecordList = ({ medicalRecords }: Props) => {
    const { onOpen } = useMedicalRecord()

    return (
        <div className="space-y-4">
            {medicalRecords.map((record) => (
                <Card key={record.id}>
                    <CardHeader>
                        <CardTitle>{record.complains}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-between items-start gap-x-4">
                        <div className="flex gap-x-4 flex-1">
                            <p className="text-muted-foreground text-sm">{format(record.createdAt, 'dd MMMM yyyy')}</p>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">
                                    <span className="font-medium text-black">Diagnosis:</span> {record.diagnosis}
                                    {record?.diagnosis}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    <span className="font-medium text-black">Vital Signs:</span> {record.vitalSigns}
                                    {record?.vitalSigns}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    <span className="font-medium text-black">Treatments:</span> {record.treatments.map((treatment) => treatment.treatment.title).join(', ')}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    <span className="font-medium text-black">Medicines:</span> {record.medicines.map((medicine) => medicine.medicine.name).join(', ')}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-x-2">
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button size="icon" variant="outline">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        View
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button size="icon" variant="outline" onClick={() => onOpen(record.id)}>
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Delete
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}