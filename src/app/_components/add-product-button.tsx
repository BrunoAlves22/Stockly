"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NumericFormat } from "react-number-format";

const productFormSchema = z.object({
  name: z.string().trim().min(1, "O nome é obrigatório"),
  price: z.number().min(0.01, "O valor é obrigatório"),
  stock: z.coerce
    .number()
    .positive({
      message: "O estoque deve ser maior ou igual a zero",
    })
    .int()
    .min(0, "O estoque é obrigatório"),
});

type ProductFormSchemaType = z.infer<typeof productFormSchema>;

export function AddProductButton() {
  const form = useForm<ProductFormSchemaType>({
    shouldUnregister: true,
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 1,
    },
  });

  function onSubmit(data: ProductFormSchemaType) {
    console.log(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center cursor-pointer hover:bg-gray-700 hover:text-gray-100"
          variant="outline"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Adicionar Produto
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Criar Produto</DialogTitle>

              <DialogDescription>
                Insira as informações do produto que deseja criar.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Produto</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome do produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor do Produto</FormLabel>
                  <FormControl>
                    <NumericFormat
                      prefix="R$ "
                      decimalSeparator=","
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalScale={2}
                      allowNegative={false}
                      customInput={Input}
                      onValueChange={(values) => {
                        field.onChange(values.floatValue || 0);
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estoque do Produto</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Digite o estoque do produto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="*:cursor-pointer">
              <DialogClose asChild>
                <Button type="reset" variant="secondary">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Criar Produto</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
