import z from "zod";

export const productFormSchema = z.object({
  name: z.string().trim().min(1, "O nome é obrigatório"),
  price: z
    .number({ required_error: "O valor é obrigatório" })
    .min(0.01, "O valor é obrigatório"),
  stock: z.coerce
    .number()
    .positive({
      message: "O estoque deve ser maior ou igual a zero",
    })
    .int()
    .min(0, "O estoque é obrigatório"),
});

export type ProductFormSchemaType = z.infer<typeof productFormSchema>;

export const deleteProductSchema = z.object({
  id: z.string().uuid("ID inválido"),
});

export type DeleteProductSchemaType = z.infer<typeof deleteProductSchema>;
