"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { PlusIcon } from "lucide-react";
import { UpsertSalesSheet } from "./upsert-sales-sheet";
import { Product } from "@prisma/client";
import { ComboboxOption } from "@/components/combobox";
import { useState } from "react";

interface CreateSaleSheetProps {
  productsData: Product[];
  productOptions: ComboboxOption[];
}

export function CreateSaleSheet({
  productsData,
  productOptions,
}: CreateSaleSheetProps) {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button
          className="flex items-center cursor-pointer hover:bg-emerald-700 hover:text-gray-100"
          variant="outline"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Criar Venda
        </Button>
      </SheetTrigger>

      <UpsertSalesSheet
        isOpen={() => setSheetOpen(false)}
        products={productsData}
        productOptions={productOptions}
      />
    </Sheet>
  );
}
