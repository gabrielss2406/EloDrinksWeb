import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import debounce from "lodash/debounce"

interface SearchFilterProps {
    field: string;
    onSearch: (value: string) => void
}

export function SearchFilter({ field, onSearch }: SearchFilterProps) {
    const [query, setQuery] = useState("")

    const debounced = useMemo(
        () => debounce((value: string) => onSearch(value), 600),
        [onSearch]
    )

    useEffect(() => {
        debounced(query)
        return () => debounced.cancel()
    }, [query, debounced])

    const clearSearch = () => {
        setQuery("")
        onSearch("")
    }

    return (
        <div className="flex items-center gap-2 mb-4">
            <Input
                placeholder={`Filtrar por ${field}...`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="max-w-sm"
            />
            {query && (
                <Button variant="outline" onClick={clearSearch}>
                    <X className="w-5 h-5" />
                </Button>
            )}
        </div>
    )
}
