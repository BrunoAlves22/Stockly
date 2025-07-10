"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { productFormSchema, ProductFormSchemaType } from "./schema";

export const upsertProduct = async ({
  id,
  name,
  price,
  stock,
}: ProductFormSchemaType) => {
  productFormSchema.parse({ name, price, stock });
  await db.product.upsert({
    where: { id: id ?? "" },
    update: {
      name,
      price: price,
      stock: stock,
    },
    create: {
      name,
      price: price,
      stock: stock,
    },
  });
  revalidatePath("/products");
};
