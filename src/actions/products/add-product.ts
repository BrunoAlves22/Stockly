"use server";

import { db } from "@/app/_lib/prisma";

import { revalidatePath } from "next/cache";
import { productFormSchema, ProductFormSchemaType } from "./schema";

export const addProduct = async ({
  name,
  price,
  stock,
}: ProductFormSchemaType) => {
  productFormSchema.parse({ name, price, stock });
  await db.product.create({
    data: {
      name,
      price,
      stock,
    },
  });
  revalidatePath("/products");
};
