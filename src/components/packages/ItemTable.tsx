import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FormNewPackageProduct } from "./Form-newPackageProduct";
import { Product } from "@/schemas/Products";
import { X } from "lucide-react";

interface ItemTableProps {
    items: Product[],
    addProduct: (product: Product) => void,
    removeProduct: (id: string) => void
}

export const ItemTable: React.FC<ItemTableProps> = ({ items, addProduct, removeProduct }) => {
    return (
        <div className="border rounded-lg p-4 shadow-md bg-white">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Produtos</h2>
                <FormNewPackageProduct addProduct={addProduct} />
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-semibold">Nome</TableHead>
                        <TableHead className="font-semibold">Preço</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.price.toFixed(2)}</TableCell>
                            <TableCell className="text-red-500 cursor-pointer" onClick={() => removeProduct(item.id)}>
                                <X color="red" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}