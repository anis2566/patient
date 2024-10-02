"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const Header = () => {
    const [perPage, setPerPage] = useState<string>();
    const [sort, setSort] = useState<string>("");

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

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
    };

    return (
        <div className="space-y-2 px-2 py-3 shadow-sm shadow-primary">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
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
