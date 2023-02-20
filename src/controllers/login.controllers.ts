import { Request, Response } from "express";
import createLoginService from "../services/login/createLogin.service";

const createLoginController = async (req: Request, res: Response): Promise<Response> => {
  const token = await createLoginService(req.body);

  return res.status(200).json({
    token: token,
  });
};

export { createLoginController };
