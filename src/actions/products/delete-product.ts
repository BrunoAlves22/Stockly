"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { DeleteProductSchemaType, deleteProductSchema } from "./schema";

export const deleteProduct = async (id: DeleteProductSchemaType) => {
  deleteProductSchema.parse(id);

  await db.product.delete({
    where: id,
  });

  revalidatePath("/products");
};
