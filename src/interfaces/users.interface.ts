import { z } from "zod";
import { createUserSchema, userResponseSchema } from "../schemas/users.schema";

type UserRequest = z.infer<typeof createUserSchema>;
type UserResponse = z.infer<typeof userResponseSchema>

export { UserRequest, UserResponse };
