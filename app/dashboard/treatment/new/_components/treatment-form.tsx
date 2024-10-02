"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

import { TreatmentSchema, TreatmentSchemaType } from "../../schema";
import { LoadingButton } from "@/components/loading-button";
import { CREATE_TREATMENT_ACTION, GET_TREATMENT_CATEGORY } from "../action";
import { cn } from "@/lib/utils";

export const TreatmentForm = () => {
    const router = useRouter();

    const { data: categories } = useQuery({
        queryKey: ["treatment-category"],
        queryFn: async () => {
            const res = await GET_TREATMENT_CATEGORY();
            return res;
        },
    });

    const { mutate: createTreatment, isPending } = useMutation({
        mutationFn: CREATE_TREATMENT_ACTION,
        onSuccess: (data) => {
            if (data?.error) {
                toast.error(data.error);
            } else {
                toast.success(data?.success);
                router.push("/dashboard/treatment");
            }
        },
    })

    const form = useForm<TreatmentSchemaType>({
        resolver: zodResolver(TreatmentSchema),
        defaultValues: {
            title: "",
            description: "",
            categoryId: "",
        },
    });

    const onSubmit = (data: TreatmentSchemaType) => {
        createTreatment(data);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>New Treatment</CardTitle>
                <CardDescription>Create a new treatment</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Category</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    disabled={isPending}
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-[200px] justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? categories?.find(
                                                            (category) => category.id === field.value
                                                        )?.name
                                                        : "Select category"}
                                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Search category..."
                                                    className="h-9"
                                                />
                                                <CommandList>
                                                    <CommandEmpty>No category found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {categories?.map((category) => (
                                                            <CommandItem
                                                                value={category.name}
                                                                key={category.id}
                                                                onSelect={() => {
                                                                    form.setValue("categoryId", category.id)
                                                                }}
                                                            >
                                                                {category.name}
                                                                <CheckIcon
                                                                    className={cn(
                                                                        "ml-auto h-4 w-4",
                                                                        category.id === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <LoadingButton
                            isLoading={isPending}
                            title="Create"
                            loadingTitle="Creating..."
                            type="submit"
                            onClick={form.handleSubmit(onSubmit)}
                        />
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}