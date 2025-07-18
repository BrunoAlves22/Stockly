"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Ellipsis, ClipboardCopy, Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import { deleteProduct } from "@/actions/products/delete-product";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialogDelete } from "./alert-dialog-delete";
import { Product } from "@prisma/client";
import { UpsertProductDialog } from "./upsert-product-dialog";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";

export function DropdownActions({ id, name, price, stock }: Product) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { execute: executeDeleteProduct } = useAction(deleteProduct, {
    onSuccess: () => {
      toast.success("Produto excluído com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao excluir produto. Tente novamente.");
    },
  });
  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(id);
      toast.success("ID do produto copiado com sucesso!");
    } catch (error) {
      console.error("Failed to copy text: ", error);
      toast.error("Falha ao copiar o ID do produto.");
    }
  };

  const handleDeleteProduct = () => executeDeleteProduct({ id });

  return (
    <AlertDialog>
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Ellipsis className="w-5 h-5 text-gray-500 cursor-pointer hover:bg-gray-200 rounded-lg transition" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="*:cursor-pointer">
            <DropdownMenuLabel className="text-gray-900">
              Ações
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={copyToClipboard}>
              <ClipboardCopy className="w-4 h-4 mr-1" />
              Copiar ID
            </DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Edit className="w-4 h-4 mr-1" />
                Editar Produto
              </DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>
                <Trash className="w-4 h-4 mr-1" />
                Excluir Produto
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <UpsertProductDialog
          defaultValues={{ id, name, price: Number(price), stock }}
          setDialogOpen={setIsEditing}
        />

        <AlertDialogDelete
          product={{ id, name }}
          handleDeleteProduct={handleDeleteProduct}
        />
      </Dialog>
    </AlertDialog>
  );
}
