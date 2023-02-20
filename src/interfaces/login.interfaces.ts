import { z } from "zod";
import { createLoginSchema } from "../schemas/login.schema";

type LoginRequest = z.infer<typeof createLoginSchema>;

export { LoginRequest };
