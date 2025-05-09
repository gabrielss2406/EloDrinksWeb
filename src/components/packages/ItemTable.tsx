import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FormNewPackageProduct } from "./Form-newPackageProduct";
import { PackageProduct } from "@/schemas/Packages";
import { Product } from "@/schemas/Products";
import { TableItem } from "./TableItem";

interface ItemTableProps {
    items: PackageProduct[],
    addProduct: (product: Product) => void,
    removeProduct: (id: string) => void,
    updateQuantity: (id: string, quantity: number) => void
}

export const ItemTable: React.FC<ItemTableProps> = ({ items, addProduct, removeProduct, updateQuantity }) => {
    const handleQuantityChange = (id: string, value: string) => {
        const quantity = parseInt(value, 10);
        if (!isNaN(quantity)) {
            updateQuantity(id, quantity);
        }
    };

    return (
        <div className="border rounded-lg p-4 shadow-md bg-white dark:bg-[#252525] ">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Produtos</h2>
                <FormNewPackageProduct addProduct={addProduct} />
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-semibold"></TableHead>
                        <TableHead className="font-semibold">Nome</TableHead>
                        <TableHead className="font-semibold">Preço</TableHead>
                        <TableHead className="font-semibold">Quantidade</TableHead>
                        <TableHead className="font-semibold">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items && items.map((item, index) => (
                        <TableItem
                            key={index}
                            itemId={item.id}
                            removeProduct={removeProduct}
                            handleQuantityChange={handleQuantityChange}
                        />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};