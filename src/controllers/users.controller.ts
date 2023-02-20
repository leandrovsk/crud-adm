import { Request, Response } from "express";
import { userResponseWithoutPassword } from "../schemas/users.schema";
import createUserService from "../services/users/createUsers.service";
import listAllUsersService from "../services/users/listAllUsers.service";
import listUserProfileService from "../services/users/listUserProfile.service";
import editUsersService from "../services/users/editUsers.service";
import deleteUsersService from "../services/users/deleteUsers.service";
import recoverUsersService from "../services/users/recoverUsers.service";

const createUsersController = async (req: Request, res: Response): Promise<Response> => {
  const newUser = await createUserService(req.body);

  const userWithoutPassword = userResponseWithoutPassword.parse(newUser);

  return res.status(201).json(userWithoutPassword);
};

const listAllUsersController = async (req: Request, res: Response): Promise<Response> => {
  const userList = await listAllUsersService();

  return res.status(200).json(userList);
};

const listUsersController = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = req.user.id;

  const user = await listUserProfileService(userId);

  return res.status(200).json(user);
};

const editUsersController = async (req: Request, res: Response): Promise<Response> => {
  const userData = req.body;

  const userId = parseInt(req.params.id);

  const editedUser = await editUsersService(userData, userId);

  return res.status(200).json(editedUser);
};

const deleteUsersController = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = parseInt(req.params.id);

  await deleteUsersService(userId);

  return res.status(204).json();
};

const recoverUsersController = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = parseInt(req.params.id);

  const user = await recoverUsersService(userId);

  return res.status(200).json(user);
};

export { createUsersController, listAllUsersController, listUsersController, editUsersController, deleteUsersController, recoverUsersController };
