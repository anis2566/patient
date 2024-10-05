"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AppointmentStatus } from "@prisma/client"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { TimePicker } from "@/components/time-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { AppointmentSchema, AppointmentSchemaType } from "../schema"
import { GET_DOCTOR_FOR_SELECT } from "../../medical-record/add/action"
import { cn } from "@/lib/utils"
import { LoadingButton } from "@/components/loading-button"
import { CREATE_APPOINMENT_ACTION } from "../action"

interface Props {
    params: {
        id: string
    }
}

const AddAppointment = ({ params: { id } }: Props) => {
    const router = useRouter();

    const { data: doctors } = useQuery({
        queryKey: ["doctors-for-appoinment-add"],
        queryFn: async () => {
            const res = await GET_DOCTOR_FOR_SELECT();
            return res;
        },
    })

    const { mutate: createAppointment, isPending } = useMutation({
        mutationFn: CREATE_APPOINMENT_ACTION,
        onSuccess: (data) => {
            if (data?.error) {
                toast.error(data.error);
            } else {
                toast.success(data.success);
                router.push(`/dashboard/patient/${id}/appointment`);
            }
        },
    })

    const form = useForm<AppointmentSchemaType>({
        resolver: zodResolver(AppointmentSchema),
        defaultValues: {
            purpose: "",
            date: undefined,
            startTime: undefined,
            endTime: undefined,
            status: undefined,
            doctorId: "",
        }
    })

    const onSubmit = (data: AppointmentSchemaType) => {
        createAppointment({ values: data, patientId: id });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add Appointment</CardTitle>
                <CardDescription>Add a new appointment for the patient.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="purpose"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Purpose</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date() || isPending
                                                }
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name='startTime'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col items-start'>
                                        <FormLabel>Start Time</FormLabel>
                                        <TimePicker setDate={field.onChange} date={field.value} disabled={isPending} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='endTime'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col items-start'>
                                        <FormLabel>End Time</FormLabel>
                                        <TimePicker setDate={field.onChange} date={field.value} disabled={isPending} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="doctorId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Doctor</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a doctor" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {doctors?.map((doctor) => (
                                                <SelectItem key={doctor.id} value={doctor.id}>{doctor.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                Object.values(AppointmentStatus).map((status) => (
                                                    <SelectItem key={status} value={status}>{status}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <LoadingButton
                            type="submit"
                            title="Submit"
                            isLoading={isPending}
                            loadingTitle="Submitting..."
                            onClick={form.handleSubmit(onSubmit)}
                        />
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default AddAppointment
