"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BloodGroup, Gender } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/date-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { UploadButton } from "@/lib/uploadthing";
import { PatientSchema, PatientSchemaType } from "../../schema";
import { CREATE_PATIENT_ACTION } from "../action";

export const PatientForm = () => {
  const router = useRouter();

  const { mutate: createPatient, isPending } = useMutation({
    mutationFn: CREATE_PATIENT_ACTION,
    onSuccess: (data) => {
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(data.success);
        router.push("/dashboard/patient");
        form.reset();
      }
    },
  });

  const form = useForm<PatientSchemaType>({
    resolver: zodResolver(PatientSchema),
    defaultValues: {
      name: "",
      email: "",
      gender: undefined,
      phone: "",
      address: "",
      dob: undefined,
      emergencyContact: "",
      imageUrl: "",
      bloodGroup: undefined,
    },
  });

  const onSubmit = (values: PatientSchemaType) => {
    createPatient(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Form</CardTitle>
        <CardDescription>
          Please fill in the form below to add a new patient.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value as Gender)}
                    defaultValue={field.value}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(Gender).map((gender) => (
                        <SelectItem key={gender} value={gender}>
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bloodGroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Group</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value as Gender)}
                    defaultValue={field.value}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a blood group" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(BloodGroup).map((bloodGroup) => (
                        <SelectItem key={bloodGroup} value={bloodGroup}>
                          {bloodGroup}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
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
                        onSelect={field.onChange}
                        selected={new Date(field.value)}
                        disabled={(date) => date > new Date() || isPending}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emergencyContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Contact</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    {form.getValues("imageUrl") ? (
                      <div className="relative">
                        <Image
                          alt="Upload"
                          width={80}
                          height={80}
                          className="h-14 w-14 rounded-full"
                          src={form.getValues("imageUrl") || ""}
                        />
                        <Button
                          className="absolute right-0 top-0"
                          variant="ghost"
                          size="icon"
                          onClick={() => form.setValue("imageUrl", "")}
                          type="button"
                          disabled={isPending}
                        >
                          <Trash2 className="text-rose-500" />
                        </Button>
                      </div>
                    ) : (
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          field.onChange(res[0].url);
                          toast.success("Image uploaded");
                        }}
                        onUploadError={(error: Error) => {
                          toast.error("Image upload failed");
                        }}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-x-3"
            >
              {isPending && <Loader2 className="h-4animate-spin w-4" />}
              {isPending ? "Loading..." : "Create Patient"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
