import { z } from "zod";
import { hashSync } from "bcryptjs";

const createUserSchema = z.object({
  name: z.string().max(20),
  email: z.string().email().max(100),
  password: z.string().transform((pass) => {
    return hashSync(pass, 10);
  }),
  admin: z.boolean().optional(),
});

const editUserSchema = z.object({
  name: z.string().max(20).optional(),
  email: z.string().email().max(100).optional(),
  password: z
    .string()
    .transform((pass) => {
      return hashSync(pass, 10);
    })
    .optional(),
});

const userResponseSchema = createUserSchema.extend({
  active: z.boolean(),
  id: z.number(),
});

const userResponseWithoutPassword = userResponseSchema.omit({
  password: true,
});

export { createUserSchema, userResponseSchema, userResponseWithoutPassword, editUserSchema };
