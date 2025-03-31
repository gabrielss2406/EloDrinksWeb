import { PackageInput } from "@/schemas/Packages";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { UseFormReturn } from "react-hook-form";

interface StructureSelectorProps {
    form: UseFormReturn<PackageInput>;
    initialValue?: string;
}

const structures = [
    {
        id: "option1",
        options: "Opção 1",
        price: 100,
        description: "Descrição da opção 1",
    },
    {
        id: "option2",
        options: "Opção 2",
        price: 150,
        description: "Descrição da opção 2",
    },
    {
        id: "option3",
        options: "Opção 3",
        price: 200,
        description: "Descrição da opção 3",
    },
];

export const StructureSelector: React.FC<StructureSelectorProps> = ({ form, initialValue }) => {
    return (
        <FormField
            control={form.control}
            name="structure"
            render={({ field, fieldState }) => (
                <FormItem>
                    <FormLabel>Estrutura</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <select
                                value={field.value?.id || initialValue || ""}
                                onChange={(e) => {
                                    const selectedStructure = structures.find((s) => s.id === e.target.value);
                                    if (selectedStructure) {
                                        field.onChange(selectedStructure);
                                    }
                                }}
                                className={`bg-gray-200 w-full p-2 rounded-md dark:bg-[#252525] border border-input ${fieldState.invalid ? "border-red-500" : "border-gray-300"
                                    }`}
                            >
                                <option value="" disabled>
                                    Selecione uma estrutura
                                </option>
                                {structures.map((structure) => (
                                    <option key={structure.id} value={structure.id}>
                                        {structure.options}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </FormControl>
                </FormItem>
            )}
        />
    );
};