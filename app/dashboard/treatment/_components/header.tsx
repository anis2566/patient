"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useDebounce } from "@/hooks/use-debounce";
import { FilterDrawer } from "./filter-drawer";

export const Header = () => {
    const [name, setName] = useState<string>("");
    const [perPage, setPerPage] = useState<string>();
    const [sort, setSort] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const searchNameValue = useDebounce(name, 500);

    const handleClose = () => {
        setOpen(false);
    };

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

    const handleReset = () => {
        router.push(pathname);
        setPerPage(undefined);
        setSort("");
        setName("");
    };

    return (
        <div className="space-y-2 px-2 py-3 shadow-sm shadow-primary">
            <FilterDrawer open={open} handleClose={handleClose} />
            <Button onClick={() => setOpen(true)} className="md:hidden">
                Filter
            </Button>
            <div className="hidden md:flex justify-between items-center">
                <div className="flex items-center gap-x-3">
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
                        value={sort || ""}
                        onValueChange={(value) => handleSortChange(value)}
                    >
                        <SelectTrigger className="w-[130px]">
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
                        <SelectTrigger className="w-[130px]">
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
                </div>
                <Button
                    variant="destructive"
                    className="bg-rose-500 text-white"
                    onClick={handleReset}
                >
                    Reset
                </Button>
            </div>
        </div>
    );
};
