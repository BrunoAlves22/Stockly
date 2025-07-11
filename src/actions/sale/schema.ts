import { z } from "zod";

export const SchemaSales = z.object({
  products: z.array(
    z.object({
      id: z.string().uuid(),
      quantity: z.number().int().positive(),
    })
  ),
});

export type SchemaSalesType = z.infer<typeof SchemaSales>;
