"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
    selected?: Date
    onChange?: (date: Date | undefined) => void
    placeholderText?: string
    className?: string
}

export function DatePicker({
    selected,
    onChange,
    placeholderText = "Pick a date",
    className,
}: DatePickerProps) {
    const [date, setDate] = React.useState<Date | undefined>(selected)

    const handleDateChange = (date: Date | undefined) => {
        setDate(date)
        onChange?.(date)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        "dark:bg-[#202020] dark:text-white",
                        !date && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>{placeholderText}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    className="bg-white dark:bg-[#202020] dark:text-white"
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => handleDateChange(selectedDate)}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
