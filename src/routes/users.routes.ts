import { Router } from "express";
import { createUsersController, deleteUsersController, editUsersController, listAllUsersController, listUsersController, recoverUsersController } from "../controllers/users.controller";
import ensureDataIsValid from "../middlewares/ensureDataIsValid.middleware";
import { createUserSchema, editUserSchema } from "../schemas/users.schema";
import ensureTokenIsValid from "../middlewares/ensureTokenIsValid.middleware";
import ensureUserExistsMiddleware from "../middlewares/ensureUserExists.middleware";
import ensureUserIsAdmMiddleware from "../middlewares/ensureUserIsAdm.middleware";
import ensureUserProperty from "../middlewares/ensureUserProperty.middleware";

const userRoutes: Router = Router();

userRoutes.post("", ensureDataIsValid(createUserSchema), createUsersController);
userRoutes.get("", ensureTokenIsValid, ensureUserIsAdmMiddleware, listAllUsersController);
userRoutes.get("/profile", ensureTokenIsValid, listUsersController);
userRoutes.patch("/:id", ensureUserExistsMiddleware, ensureTokenIsValid, ensureDataIsValid(editUserSchema), ensureUserProperty, editUsersController);
userRoutes.delete("/:id", ensureUserExistsMiddleware, ensureTokenIsValid, ensureUserProperty, deleteUsersController);
userRoutes.put("/:id/recover", ensureUserExistsMiddleware, ensureTokenIsValid, ensureUserIsAdmMiddleware, recoverUsersController);

export default userRoutes;
