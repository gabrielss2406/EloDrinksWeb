import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { PackageProduct } from "@/schemas/Packages";

interface FormNewPackageProductProps {
    addProduct: (product: PackageProduct) => void;
}

export const FormNewPackageProduct: React.FC<FormNewPackageProductProps> = ({ addProduct }) => {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [products] = useState<PackageProduct[]>([
        // { id: "1", name: "Coca-Cola", price: 5.0, quantity: 1 },
        // { id: "2", name: "Pepsi", price: 4.5, quantity: 1 },
        // { id: "3", name: "Guaraná", price: 4.0, quantity: 1 },
        // { id: "4", name: "Água Mineral", price: 2.0, quantity: 1 },
        // { id: "5", name: "Suco de Laranja", price: 6.0, quantity: 1 },
        // { id: "6", name: "Chá Gelado", price: 3.5, quantity: 1 },
        // { id: "7", name: "Energético", price: 8.0, quantity: 1 },
    ]);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleProductClick = (product: PackageProduct) => {
        addProduct(product);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-amber-700 hover:bg-amber-800 text-white flex items-center">
                    Adicionar produto ao pacote <Plus size={16} className="ml-2" />
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-[#202020] dark:text-white">
                <DialogHeader>
                    <DialogTitle>Adicionado produtos ao pacotes</DialogTitle>
                    <DialogDescription>
                        Pesquise o nome dos produtos.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Buscar produto..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 border rounded dark:bg-[#303030] dark:border-[#404040]"
                    />
                    {searchQuery && (
                        <ul className="mt-4">
                            {filteredProducts.map((product) => (
                                <li
                                    key={product.id}
                                    className="flex justify-between p-2 border-b dark:border-[#404040] cursor-pointer hover:bg-gray-100 dark:hover:bg-[#303030]"
                                    onClick={() => handleProductClick(product)}
                                >
                                    <span>{product.name}</span>
                                    <span>R$ {product.price.toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};