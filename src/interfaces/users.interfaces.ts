import { z } from "zod";
import { createUserSchema, userResponseSchema, userResponseWithoutPassword, editUserSchema } from "../schemas/users.schema";

type UserRequest = z.infer<typeof createUserSchema>;
type UserResponse = z.infer<typeof userResponseSchema>;
type UserResponseWithoutPassword = z.infer<typeof userResponseWithoutPassword>;
type UserEditRequest = z.infer<typeof editUserSchema>;

export { UserRequest, UserResponse, UserResponseWithoutPassword, UserEditRequest };
