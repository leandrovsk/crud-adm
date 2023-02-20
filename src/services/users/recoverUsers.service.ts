import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { AppError } from "../../errors";
import { UserResponse } from "../../interfaces/users.interfaces";

const recoverUsersService = async (userId: number): Promise<UserResponse> => {
  const queryStringActive = `
    SELECT
      *
    FROM
      users
    WHERE
      id = $1;
  `;

  const queryConfigActive: QueryConfig = {
    text: queryStringActive,
    values: [userId],
  };

  const queryResultActive: QueryResult<UserResponse> = await client.query(queryConfigActive);

  if (queryResultActive.rows[0].active) {
    throw new AppError("User already active", 400);
  }

  const queryString: string = `
    UPDATE
      users
    SET
      active = true
    WHERE
      id = $1
    RETURNING id, name, email, admin, active;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: QueryResult<UserResponse> = await client.query(queryConfig);

  return queryResult.rows[0];
};

export default recoverUsersService;
