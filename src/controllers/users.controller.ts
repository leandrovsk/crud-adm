import { Request, Response } from "express";
import createUserService from "../services/createUsers.service";

const createUsersController = async (req: Request, res: Response): Promise<Response> => {
  const newUser = await createUserService(req.body);

  return res.status(201).json(newUser);
};

const listAllUsersController = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json();
};

const listUsersController = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json();
};

const editUsersController = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json();
};

const deleteUsersController = async (req: Request, res: Response): Promise<Response> => {
  return res.status(204).json();
};

const recoverUsersController = async (req: Request, res: Response): Promise<Response> => {
  return res.status(204).json();
};

export { createUsersController, listAllUsersController, listUsersController, editUsersController, deleteUsersController, recoverUsersController };
