import { Request, Response, NextFunction } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { UserResponse } from "../interfaces/users.interface";
import { AppError } from "../errors";

const ensureEmailNotExists = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const queryString: string = `
    SELECT 
      *
    FROM
      users
    WHERE
      email = $1
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [req.body.email],
  };

  const queryResult: QueryResult<UserResponse> = await client.query(queryConfig);

  if (queryResult.rowCount > 0) {
    throw new AppError("E-mail already registered", 409);
  }

  next();
};

export default ensureEmailNotExists;
