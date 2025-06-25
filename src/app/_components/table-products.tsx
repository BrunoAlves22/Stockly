import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@prisma/client";
import { Ellipsis } from "lucide-react";

export function TableProducts({ products }: { products: Product[] }) {
  return (
    <Table className="container">
      <TableHeader>
        <TableRow className="text-[14px] font-semibold *:text-gray-500">
          <TableHead>Produtos</TableHead>
          <TableHead>Valor Unitário</TableHead>
          <TableHead>Estoque</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.price.toString()}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>
              <Badge
                className={` ${
                  product.stock <= 0
                    ? "bg-gray-300 text-black"
                    : "bg-green-300 text-black"
                }`}
              >
                <span
                  className={`${
                    product.stock <= 0
                      ? "w-2 h-2 bg-gray-500 rounded-full"
                      : "w-2 h-2 bg-green-500 rounded-full"
                  }`}
                ></span>
                {product.stock <= 0 ? "Esgotado" : "Em Estoque"}
              </Badge>
            </TableCell>
            <TableCell>
              <Ellipsis className="w-5 h-5 text-gray-500 cursor-pointer hover:bg-gray-200 rounded-lg transition" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
