import { Router } from "express";
import { createUsersController, deleteUsersController, editUsersController, listAllUsersController, listUsersController, recoverUsersController } from "../controllers/users.controller";
import ensureDataIsValid from "../middlewares/ensureDataIsValid.middleware";
import { createUserSchema } from "../schemas/users.schema";
import ensureEmailNotExists from "../middlewares/ensureEmailNotExists.middleware";

const userRoutes: Router = Router();

userRoutes.post("", ensureDataIsValid(createUserSchema), ensureEmailNotExists, createUsersController);
userRoutes.get("", listAllUsersController);
userRoutes.get("/profile", listUsersController);
userRoutes.patch("/:id", editUsersController);
userRoutes.delete("/:id", deleteUsersController);
userRoutes.put("/:id/recover", recoverUsersController);

export default userRoutes;
