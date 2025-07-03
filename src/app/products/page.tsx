import { AddProductButton } from "../_components/add-product-button";
import { TableProducts } from "../_components/table-products";
import { cachedGetProducts } from "../_data-access/product/get-products";

const ProductsPage = async () => {
  const products = await cachedGetProducts();
  return (
    <div className="w-full space-y-8 p-8 mx-8 my-8 bg-gray-100 rounded-2xl">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-gray-500">
            Gestão de Produtos
          </span>
          <h2 className="text-xl font-semibold">Produtos</h2>
        </div>

        <AddProductButton />
      </div>

      <TableProducts products={JSON.parse(JSON.stringify(products))} />
    </div>
  );
};

export default ProductsPage;
