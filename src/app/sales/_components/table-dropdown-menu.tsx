import { Product } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, ClipboardCopy, Trash } from "lucide-react";
import { toast } from "sonner";

interface SalesTableDropdownMenuProps {
  product: Pick<Product, "id">;
  onDelete: (id: string) => void;
}

export function SalesTableDropdownMenu({
  product,
  onDelete,
}: SalesTableDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis className="w-5 h-5 text-gray-500 cursor-pointer hover:bg-gray-200 rounded-lg transition" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="*:cursor-pointer">
        <DropdownMenuLabel className="text-gray-900">Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(product.id);
            toast.success("ID do produto copiado com sucesso!");
          }}
        >
          <ClipboardCopy className="w-4 h-4 mr-1" />
          Copiar ID
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onDelete(product.id)}>
          <Trash className="w-4 h-4 mr-1" />
          Excluir Produto
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
