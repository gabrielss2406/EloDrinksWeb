import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useSearchProducts } from "@/hooks/useProduts";
import { Product } from "@/schemas/Products";

interface FormNewPackageProductProps {
    addProduct: (product: Product) => void;
}

export const FormNewPackageProduct: React.FC<FormNewPackageProductProps> = ({ addProduct }) => {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { data: products = [] } = useSearchProducts(searchQuery)

    const handleProductClick = (product: Product) => {
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
                            {products.map((product) => (
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