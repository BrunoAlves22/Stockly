import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { UpsertSalesSheet } from "./_components/upsert-sales-sheet";
import { MinusIcon } from "lucide-react";
import { getProducts } from "../_data-access/product/get-products";
import { ComboboxOption } from "@/components/combobox";

export default async function SalesPage() {
  const products = await getProducts();
  const productOptions: ComboboxOption[] = products.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  return (
    <div className="w-full space-y-8 p-8 mx-8 my-8 bg-gray-100 rounded-2xl">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-emerald-500">
            Gestão de Vendas
          </span>
          <h2 className="text-xl font-semibold">Produtos</h2>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="flex items-center cursor-pointer hover:bg-emerald-700 hover:text-gray-100"
              variant="outline"
            >
              <MinusIcon className="mr-2 h-4 w-4" />
              Criar Venda
            </Button>
          </SheetTrigger>

          <UpsertSalesSheet productOptions={productOptions} />
        </Sheet>
      </div>

      {/* <TableProducts products={JSON.parse(JSON.stringify(products))} /> */}
    </div>
  );
}
