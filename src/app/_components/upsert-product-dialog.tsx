import { addProduct } from "@/actions/products/add-product";
import {
  productFormSchema,
  ProductFormSchemaType,
} from "@/actions/products/schema";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";

interface UpsertProductDialogProps {
  setDialogOpen: (open: boolean) => void;
}

export function UpsertProductDialog({
  setDialogOpen,
}: UpsertProductDialogProps) {
  const form = useForm<ProductFormSchemaType>({
    shouldUnregister: true,
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 1,
    },
  });

  async function onSubmit(data: ProductFormSchemaType) {
    try {
      await addProduct(data);
      setDialogOpen(false);
      form.reset();
      // Aqui você pode adicionar lógica para atualizar a lista de produtos, se necessário
      toast.success("Produto criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      // Aqui você pode adicionar lógica para lidar com erros, como exibir uma notificação
      toast.error("Erro ao criar produto. Tente novamente.");
    }
  }

  return (
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
                      field.onChange(values.floatValue);
                    }}
                    {...field}
                    onChange={() => {}}
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
                    min={0}
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
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Criar Produto
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
