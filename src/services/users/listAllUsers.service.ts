import { QueryResult } from "pg";
import { UserResponseWithoutPassword } from "../../interfaces/users.interfaces";
import { client } from "../../database";

const listAllUsersService = async () => {
  const queryString: string = `
    SELECT
      id,
      name,
      email,
      admin,
      active
    FROM
      users;
  `;

  const queryResult: QueryResult<UserResponseWithoutPassword> = await client.query(queryString);

  return queryResult.rows;
};

export default listAllUsersService;
