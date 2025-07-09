"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Ellipsis, ClipboardCopy, Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@prisma/client";
import { deleteProduct } from "@/actions/products/delete-product";

type ProductPick = Pick<Product, "id" | "name">;

type DeleteProductProps = {
  productId: string;
};

export function DropdownActions(product: ProductPick) {
  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(product.id);
      toast.success("ID do produto copiado com sucesso!");
    } catch (error) {
      console.error("Failed to copy text: ", error);
      toast.error("Falha ao copiar o ID do produto.");
    }
  };

  const handleDeleteProduct = async ({ productId }: DeleteProductProps) => {
    try {
      await deleteProduct({ id: productId });
      toast.success("Produto excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      toast.error("Erro ao excluir produto. Tente novamente.");
    }
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Ellipsis className="w-5 h-5 text-gray-500 cursor-pointer hover:bg-gray-200 rounded-lg transition" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="*:cursor-pointer">
          <DropdownMenuLabel className="text-gray-900">Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={copyToClipboard}>
            <ClipboardCopy className="w-4 h-4 mr-1" />
            Copiar ID
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit className="w-4 h-4 mr-1" />
            Editar Produto
          </DropdownMenuItem>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem>
              <Trash className="w-4 h-4 mr-1" />
              Excluir Produto
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você tem certeza de que deseja excluir?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Você está prestes a excluir o
            produto <span className="font-bold">{product.name}</span>. Tem
            certeza de que deseja continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="*:cursor-pointer">
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeleteProduct({ productId: product.id })}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
