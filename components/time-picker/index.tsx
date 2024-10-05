"use client";

import * as React from "react";

import { TimePickerInput } from "./time-picker-input";
import { TimePeriodSelect } from "./time-period-select";
import { Period } from "@/lib/time-picker-utils";

interface TimePickerDemoProps {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    disabled?: boolean;
}

export function TimePicker({ date, setDate, disabled }: TimePickerDemoProps) {
    const [period, setPeriod] = React.useState<Period>("PM");

    const minuteRef = React.useRef<HTMLInputElement>(null);
    const hourRef = React.useRef<HTMLInputElement>(null);
    const secondRef = React.useRef<HTMLInputElement>(null);
    const periodRef = React.useRef<HTMLButtonElement>(null);

    return (
        <div className="flex items-center gap-2">
            <TimePickerInput
                picker="12hours"
                period={period}
                date={date}
                setDate={setDate}
                ref={hourRef}
                onRightFocus={() => minuteRef.current?.focus()}
                disabled={disabled}
            />
            <TimePickerInput
                picker="minutes"
                id="minutes12"
                date={date}
                setDate={setDate}
                ref={minuteRef}
                onLeftFocus={() => hourRef.current?.focus()}
                onRightFocus={() => secondRef.current?.focus()}
                disabled={disabled}
            />
            <TimePickerInput
                picker="seconds"
                id="seconds12"
                date={date}
                setDate={setDate}
                ref={secondRef}
                onLeftFocus={() => minuteRef.current?.focus()}
                onRightFocus={() => periodRef.current?.focus()}
                disabled={disabled}
            />
            <TimePeriodSelect
                period={period}
                setPeriod={setPeriod}
                date={date}
                setDate={setDate}
                ref={periodRef}
                onLeftFocus={() => secondRef.current?.focus()}
                disabled={disabled}
            />
        </div>
    );
}