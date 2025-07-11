"use client";

import { Combobox, ComboboxOption } from "@/components/combobox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SalesTableDropdownMenu } from "./table-dropdown-menu";

interface UpsertSalesSheetProps {
  products: Product[];
  productOptions: ComboboxOption[];
}

const salesSchema = z.object({
  productId: z.string().uuid("ID do produto inválido"),
  quantity: z.coerce.number().int().positive("Quantidade deve ser positiva"),
});

type SalesFormData = z.infer<typeof salesSchema>;

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export function UpsertSalesSheet({
  productOptions,
  products,
}: UpsertSalesSheetProps) {
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct[]>([]);

  const form = useForm<SalesFormData>({
    resolver: zodResolver(salesSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  const onSubmit = (data: SalesFormData) => {
    const selectProduct = products.find(
      (product) => product.id === data.productId
    );

    if (!selectProduct) return;

    setSelectedProduct((prev) => {
      const existingProduct = prev.find(
        (product) => product.id === selectProduct.id
      );

      if (existingProduct) {
        return prev.map((product) =>
          product.id === existingProduct.id
            ? {
                ...product,
                quantity: product.quantity + data.quantity,
              }
            : product
        );
      }

      return [
        ...prev,
        {
          id: selectProduct.id,
          name: selectProduct.name,
          price: Number(selectProduct.price),
          quantity: data.quantity,
        },
      ];
    });

    form.reset();
  };

  const productsTotal = useMemo(() => {
    return selectedProduct.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  }, [selectedProduct]);

  const onDelete = (id: string) => {
    setSelectedProduct((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <SheetContent className="w-[400px] sm:w-[540px] px-4">
      <SheetHeader>
        <SheetTitle>Nova venda</SheetTitle>
        <SheetDescription>
          Insira os detalhes da venda para continuar.
        </SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Combobox
                    {...field}
                    placeholder="Selecione um produto"
                    options={productOptions}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite a quantidade"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            className="flex items-center cursor-pointer hover:bg-emerald-700 hover:text-gray-100 w-full"
            variant="secondary"
            type="submit"
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar produto á venda
          </Button>
        </form>
      </Form>

      <Table>
        <TableCaption>Lista de produtos á venda</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Valor Unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProduct.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price)}
              </TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price * product.quantity)}
              </TableCell>
              <TableCell>
                <SalesTableDropdownMenu
                  onDelete={onDelete}
                  product={{ id: product.id }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-right font-semibold">
              Total:
            </TableCell>
            <TableCell>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(productsTotal)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </SheetContent>
  );
}
