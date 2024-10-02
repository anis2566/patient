"use client";

import { CalendarIcon, SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { format } from "date-fns";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useDebounce } from "@/hooks/use-debounce";
import { FilterDrawer } from "./filter-drawer";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [perPage, setPerPage] = useState<string>();
  const [sort, setSort] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>();
  const [open, setOpen] = useState<boolean>(false);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchNameValue = useDebounce(name, 500);
  const searchPhoneValue = useDebounce(phone, 500);

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

  useEffect(() => {
    const url = queryString.stringifyUrl(
      {
        url: pathname,
        query: {
          phone: searchPhoneValue,
        },
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(url);
  }, [searchPhoneValue, router, pathname]);

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

  const handleDateChange = (date: Date) => {
    setDate(date);
    const params = Object.fromEntries(searchParams.entries());
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    const url = queryString.stringifyUrl(
      {
        url: pathname,
        query: {
          ...params,
          date: nextDay.toISOString(),
        },
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(url);
  };

  const handleReset = () => {
    router.push(pathname);
    setName("");
    setPhone("");
    setPerPage(undefined);
    setSort("");
    setDate(undefined);
  };

  return (
    <div className="space-y-2 px-2 py-3 shadow-sm shadow-primary">
      <FilterDrawer open={open} handleClose={handleClose} />
      <Button onClick={() => setOpen(true)} className="md:hidden">
        Filter
      </Button>

      <div className="hidden items-center gap-x-3 md:flex">
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
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by phone..."
            className="w-full appearance-none bg-background pl-8 shadow-none"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[200px] justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && handleDateChange(date)}
            />
          </PopoverContent>
        </Popover>
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
