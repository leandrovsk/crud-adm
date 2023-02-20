import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { AppError } from "../../errors";
import { UserEditRequest, UserResponse, UserResponseWithoutPassword } from "../../interfaces/users.interfaces";

const editUserService = async (userData: UserEditRequest, userId: number) => {
  const queryStringUserExists: string = `
  SELECT 
    *
  FROM
    users
  WHERE
    email = $1
`;

  const queryConfigUserExists: QueryConfig = {
    text: queryStringUserExists,
    values: [userData.email],
  };

  const queryResultUserExists: QueryResult<UserResponse> = await client.query(queryConfigUserExists);

  if (queryResultUserExists.rowCount > 0) {
    throw new AppError("E-mail already registered", 409);
  }

  const queryString: string = format(
    `
      UPDATE
        users 
      SET(%I) = ROW (%L)
      WHERE
        id = $1
      RETURNING id, name, email, active, admin;
    `,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: QueryResult<UserResponseWithoutPassword> = await client.query(queryConfig);

  return queryResult.rows[0];
};

export default editUserService;
