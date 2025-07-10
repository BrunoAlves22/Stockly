"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { UpsertProductDialog } from "./upsert-product-dialog";

export function AddProductButton() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center cursor-pointer hover:bg-emerald-700 hover:text-gray-100"
          variant="outline"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Adicionar Produto
        </Button>
      </DialogTrigger>

      <UpsertProductDialog setDialogOpen={setDialogOpen} />
    </Dialog>
  );
}
