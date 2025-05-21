import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BudgetItem } from "@/schemas/Orders";

interface ItemTableProps {
    items: BudgetItem[],
    addProduct?: (product: BudgetItem) => void,
    removeProduct?: (id: string) => void,
    updateQuantity?: (id: string, quantity: number) => void
}

export const ItemTable: React.FC<ItemTableProps> = ({ items }) => {
    // const handleQuantityChange = (id: string, value: string) => {
    //     const quantity = parseInt(value, 10);
    //     if (!isNaN(quantity)) {
    //         updateQuantity(id, quantity);
    //     }
    // };

    return (
        <div className="border rounded-lg p-4 shadow-md bg-white dark:bg-[#252525] ">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Produtos</h2>
                {/* <FormNewBudgetProduct addProduct={addProduct} /> */}
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-semibold">Nome</TableHead>
                        <TableHead className="font-semibold">Preço (unidade)</TableHead>
                        <TableHead className="font-semibold">Quantidade</TableHead>
                        {/* <TableHead className="font-semibold">Ações</TableHead> */}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.unit_price.toFixed(2)}</TableCell>
                            <TableCell>
                                <Input
                                    type="number"
                                    value={item.quantity}
                                    readOnly={true}
                                    // onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                    className="border rounded px-2 py-1 w-16 [&::-webkit-inner-spin-button]:appearance-auto"
                                />
                            </TableCell>
                            {/* <TableCell className="text-red-500 cursor-pointer" onClick={() => removeProduct(item.id)}>
                                <X color="red" />
                            </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};