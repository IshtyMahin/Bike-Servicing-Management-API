

import { z } from "zod";

const errorResponseSchema = z.object({
  success: z.literal(false),
  status: z.number(),
  message: z.string(),
  stack: z.string().optional(),
  issues: z.array(z.object({
    code: z.string(),
    path: z.array(z.union([z.string(), z.number()])),
    message: z.string()
  })).optional() 
});

export type ErrorResponse = z.infer<typeof errorResponseSchema>;
export { errorResponseSchema };