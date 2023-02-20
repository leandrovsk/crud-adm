import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database";
import { UserRequest, UserResponse } from "../interfaces/users.interface";

const createUsersService = async (userData: UserRequest) => {
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
