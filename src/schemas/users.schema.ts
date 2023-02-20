import { z } from "zod";
import { hashSync } from "bcryptjs";

const createUserSchema = z.object({
  name: z.string().max(20),
  email: z.string().email().max(100),
  password: z.string().transform((pass) => {
    return hashSync(pass, 10);
  }),
  admin: z.boolean().optional(),
  active: z.boolean(),
});

const userResponseSchema = createUserSchema.extend({
  id: z.number(),
});

export { createUserSchema, userResponseSchema };
