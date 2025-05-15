import { TableCell, TableRow } from "@/components/ui/table";
import { X } from "lucide-react";
import Image from 'next/image';
import { useProduct } from "@/hooks/useProduts";
import Loading from "../shared/Loading";
import { Input } from "../ui/input";
import { useEffect } from "react";
import { toast } from "sonner";

interface TableItemProps {
    itemId: number,
    itemQuantity?: number,
    removeProduct: (id: string) => void,
    handleQuantityChange: (id: string, value: string) => void
}

export const TableItem: React.FC<TableItemProps> = ({ itemId, itemQuantity, removeProduct, handleQuantityChange }) => {
    const { data, isLoading, isError } = useProduct(String(itemId))

    useEffect(() => {
        if (isError) {
            toast.error("Erro ao carregar produtos.");
        }
    }, [isError]);

    return (
        isLoading || !data ? (
            <TableRow>
                <TableCell colSpan={4}>
                    <Loading />
                </TableCell>
            </TableRow>
        ) : (
            <TableRow key={itemId}>
                <TableCell>
                    <Image
                        src={data.img_url}
                        alt={data.name}
                        width={24}
                        height={24}
                        className="rounded-full object-cover"
                    />
                </TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.price.toFixed(2)}</TableCell>
                <TableCell>
                    <Input
                        value={itemQuantity}
                        type="number"
                        onChange={(e) => handleQuantityChange(data.id, e.target.value)}
                        className="border rounded px-2 py-1 w-16"
                    />
                </TableCell>
                <TableCell
                    className="text-red-500 cursor-pointer"
                    onClick={() => removeProduct(data.id)}
                >
                    <X color="red" />
                </TableCell>
            </TableRow>
        )
    );
}