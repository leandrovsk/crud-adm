import { Request, Response, NextFunction } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../errors";
import { UserResponse } from "../interfaces/users.interfaces";

const ensureUserExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const userId: number = parseInt(req.params.id);

  const queryString: string = `
    SELECT
      *
    FROM
      users
    WHERE
      id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: QueryResult<UserResponse> = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("User not found");
  }

  next();
};

export default ensureUserExistsMiddleware;
