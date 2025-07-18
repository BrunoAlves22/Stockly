"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { productFormSchema } from "./schema";
import { actionClient } from "@/app/_lib/safe-action";

export const upsertProduct = actionClient
  .inputSchema(productFormSchema)
  .action(async ({ parsedInput }) => {
    const { id, name, price, stock } = parsedInput;
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
  });
