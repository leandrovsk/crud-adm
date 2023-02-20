import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { AppError } from "../../errors";
import { UserRequest, UserResponse } from "../../interfaces/users.interfaces";

const createUsersService = async (userData: UserRequest) => {
  const queryStringUserExists: string = `
  SELECT 
    *
  FROM
    users
  WHERE
    email = $1
`;

  const queryConfig: QueryConfig = {
    text: queryStringUserExists,
    values: [userData.email],
  };

  const queryResultUserExists: QueryResult<UserResponse> = await client.query(queryConfig);

  if (queryResultUserExists.rowCount > 0) {
    throw new AppError("E-mail already registered", 409);
  }

  const queryString: string = format(
    `
    INSERT INTO
      users (%I)
    VALUES (%L)
    RETURNING *;
  `,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryResult: QueryResult<UserResponse> = await client.query(queryString);

  return queryResult.rows[0];
};

export default createUsersService;
