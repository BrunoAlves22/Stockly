import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Product } from "@prisma/client";

type ProductPick = Pick<Product, "id" | "name">;

interface AlertDialogDeleteProps {
  product: ProductPick;
  handleDeleteProduct: () => void;
}

export function AlertDialogDelete({
  product,
  handleDeleteProduct,
}: AlertDialogDeleteProps) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Você tem certeza de que deseja excluir?
        </AlertDialogTitle>
        <AlertDialogDescription>
          Esta ação não pode ser desfeita. Você está prestes a excluir o produto{" "}
          <span className="font-bold">{product.name}</span>. Tem certeza de que
          deseja continuar?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="*:cursor-pointer">
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={() => handleDeleteProduct()}>
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
