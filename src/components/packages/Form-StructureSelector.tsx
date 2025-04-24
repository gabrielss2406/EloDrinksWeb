import { PackageInput } from "@/schemas/Packages";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { useStructures } from "@/hooks/useStructures";
import { Structure } from "@/schemas/Structures";
import { toast } from "sonner";
import Loading from "../shared/Loading";

interface StructureSelectorProps {
    form: UseFormReturn<PackageInput>;
}

export const StructureSelector: React.FC<StructureSelectorProps> = ({ form }) => {
    const { data = [], isLoading, isError } = useStructures(1, 20)

    if (isError) {
        toast.error("Erro ao carregar estruturas.");
    }

    return (
        <FormField
            control={form.control}
            name="structure_id"
            render={({ field, fieldState }) => (
                <FormItem>
                    <FormLabel>Estrutura</FormLabel>
                    <FormControl>
                        <div className="relative">
                            {isLoading ? (
                                <Loading />
                            ) : (
                                <select
                                    value={field.value?.toString() || ""}
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
                                        Selecione uma estrutura
                                    </option>
                                    {data.map((structure: Structure) => (
                                        <option key={structure.id} value={structure.id.toString()}>
                                            {structure.name}
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