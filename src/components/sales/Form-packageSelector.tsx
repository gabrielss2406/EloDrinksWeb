import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import Loading from "../shared/Loading";
import { SalesInput } from "@/schemas/Sales";
import { usePackages } from "@/hooks/usePackages";
import { Package } from "@/schemas/Packages";

interface PackageSelectorProps {
    form: UseFormReturn<SalesInput>;
}

export const PackageSelector: React.FC<PackageSelectorProps> = ({ form }) => {
    const { data = [], isLoading, isError } = usePackages(1, 20)

    if (isError) {
        toast.error("Erro ao carregar pacotes.");
    }

    return (
        <FormField
            control={form.control}
            name="pack_id"
            render={({ field, fieldState }) => (
                <FormItem>
                    <FormLabel>Pacote</FormLabel>
                    <FormControl>
                        <div className="relative">
                            {isLoading ? (
                                <Loading />
                            ) : (
                                <select
                                    value={field.value || ""}
                                    onChange={(e) => {
                                        const selectedStructure = data.find((s) => s.id.toString() === e.target.value);
                                        if (selectedStructure) {
                                            field.onChange(selectedStructure.id);
                                        } else {
                                            field.onChange("");
                                        }
                                    }}
                                    className={`bg-gray-200 w-full p-2 rounded-md dark:bg-[#252525] border border-input ${fieldState.invalid ? "border-red-500" : "border-gray-300"
                                        }`}
                                >
                                    <option value="" disabled>
                                        Selecione um pacote
                                    </option>
                                    {data.map((pack: Package) => (
                                        <option key={pack.id} value={pack.id.toString()}>
                                            {pack.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </FormControl>
                </FormItem>
            )}
        />
    );
};