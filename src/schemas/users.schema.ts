import { z } from "zod";
import { hashSync } from "bcryptjs";

const userResponseSchema = z.object({
  id: z.number(),
  name: z.string().max(20),
  email: z.string().email().max(100),
  password: z.string().transform((pass) => {
    return hashSync(pass, 10);
  }),
  admin: z.boolean().optional(),
  active: z.boolean(),
});

const createUserSchema = userResponseSchema.omit({
  id: true,
  active: true,
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

const userResponseWithoutPassword = userResponseSchema.omit({
  password: true,
});

export { createUserSchema, userResponseSchema, userResponseWithoutPassword, editUserSchema };
