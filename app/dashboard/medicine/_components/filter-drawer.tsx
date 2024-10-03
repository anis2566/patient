"use client";

import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useEffect, useMemo, useState } from "react";
import { MedicineGeneric, MedicineManufacturer } from "@prisma/client";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";


import { useDebounce } from "@/hooks/use-debounce";


interface Props {
    open: boolean;
    handleClose: () => void;
    generics: MedicineGeneric[];
    manufacturers: MedicineManufacturer[];
}

export const FilterDrawer = ({ open, handleClose, generics, manufacturers }: Props) => {
    const [name, setName] = useState<string>("");
    const [perPage, setPerPage] = useState<string>();
    const [sort, setSort] = useState<string>("");
    const [generic, setGeneric] = useState<string>("");
    const [manufacturer, setManufacturer] = useState<string>("");

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const searchNameValue = useDebounce(name, 500);

    const memorizedGenerics = useMemo(() => generics, [generics]);
    const memorizedManufacturers = useMemo(() => manufacturers, [manufacturers]);

    useEffect(() => {
        const params = Object.fromEntries(searchParams.entries());
        const url = queryString.stringifyUrl(
            {
                url: pathname,
                query: {
                    ...params,
                    name: searchNameValue,
                },
            },
            { skipEmptyString: true, skipNull: true },
        );

        router.push(url);
    }, [searchNameValue, router, pathname, searchParams]);

    const handlePerPageChange = (perPage: string) => {
        setPerPage(perPage);
        const params = Object.fromEntries(searchParams.entries());
        const url = queryString.stringifyUrl(
            {
                url: pathname,
                query: {
                    ...params,
                    perPage,
                },
            },
            { skipNull: true, skipEmptyString: true },
        );

        router.push(url);
    };

    const handleSortChange = (sort: string) => {
        setSort(sort);
        const params = Object.fromEntries(searchParams.entries());
        const url = queryString.stringifyUrl(
            {
                url: pathname,
                query: {
                    ...params,
                    sort,
                },
            },
            { skipEmptyString: true, skipNull: true },
        );

        router.push(url);
    };

    const handleGenericChange = (generic: string) => {
        setGeneric(generic);
        const params = Object.fromEntries(searchParams.entries());
        const url = queryString.stringifyUrl(
            {
                url: pathname,
                query: {
                    ...params,
                    generic,
                },
            },
            { skipEmptyString: true, skipNull: true },
        );

        router.push(url);
    };

    const handleManufacturerChange = (manufacturer: string) => {
        setManufacturer(manufacturer);
        const params = Object.fromEntries(searchParams.entries());
        const url = queryString.stringifyUrl(
            {
                url: pathname,
                query: {
                    ...params,
                    manufacturer,
                },
            },
            { skipEmptyString: true, skipNull: true },
        );

        router.push(url);
    };

    const handleReset = () => {
        router.push(pathname);
        setPerPage(undefined);
        setSort("");
        setName("");
        setGeneric("");
        setManufacturer("");
    };

    return (
        <Sheet open={open} onOpenChange={handleClose}>
            <SheetContent>
                <SheetHeader className="space-y-0">
                    <SheetTitle className="text-start">Filter</SheetTitle>
                    <SheetDescription className="text-start">
                        Filter search result
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-4 space-y-3">
                    <div className="relative">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search by name..."
                            className="w-full appearance-none bg-background pl-8 shadow-none"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <Select
                        value={generic || ""}
                        onValueChange={(value) => handleGenericChange(value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Generic" />
                        </SelectTrigger>
                        <SelectContent>
                            {memorizedGenerics.map((generic, i) => (
                                <SelectItem value={generic.name} key={i}>
                                    {generic.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        value={manufacturer || ""}
                        onValueChange={(value) => handleManufacturerChange(value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Manufacturer" />
                        </SelectTrigger>
                        <SelectContent>
                            {memorizedManufacturers.map((manufacturer, i) => (
                                <SelectItem value={manufacturer.name} key={i}>
                                    {manufacturer.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        value={sort || ""}
                        onValueChange={(value) => handleSortChange(value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Sort" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="desc">Newest</SelectItem>
                            <SelectItem value="asc">Oldest</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        value={perPage || ""}
                        onValueChange={(value) => handlePerPageChange(value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Limit" />
                        </SelectTrigger>
                        <SelectContent>
                            {["5", "10", "20", "50", "100", "200"].map((v, i) => (
                                <SelectItem value={v} key={i}>
                                    {v}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button
                        variant="destructive"
                        className="bg-rose-500 text-white"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};
