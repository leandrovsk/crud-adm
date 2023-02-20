import { QueryConfig, QueryResult } from "pg";
import { LoginRequest } from "../../interfaces/login.interfaces";
import { UserResponse } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { AppError } from "../../errors";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const createLoginService = async (loginData: LoginRequest): Promise<string> => {
  const queryString: string = `
    SELECT 
      * 
    FROM 
      users 
    WHERE 
      email = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [loginData.email],
  };

  const queryResult: QueryResult<UserResponse> = await client.query(queryConfig);

  if (queryResult.rowCount === 0 || !queryResult.rows[0].active) {
    throw new AppError("Wrong email/password", 401);
  }

  const matchPassword: boolean = await compare(loginData.password, queryResult.rows[0].password);

  if (!matchPassword) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = jwt.sign(
    {
      admin: queryResult.rows[0].admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: queryResult.rows[0].id.toString(),
    }
  );

  return token;
};

export default createLoginService;
