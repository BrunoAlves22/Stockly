import { getProducts } from "../_data-access/product/get-products";
import { ComboboxOption } from "@/components/combobox";
import { CreateSaleSheet } from "./_components/create-sale-sheet";

export default async function SalesPage() {
  const products = await getProducts();
  const productsData = JSON.parse(JSON.stringify(products));
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

        <CreateSaleSheet
          productOptions={productOptions}
          productsData={productsData}
        />
      </div>
    </div>
  );
}
