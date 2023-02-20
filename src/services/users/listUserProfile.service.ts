import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { UserResponseWithoutPassword } from "../../interfaces/users.interfaces";

const listUserProfileService = async (userId: number): Promise<UserResponseWithoutPassword> => {
  const queryString: string = `
    SELECT
      id,
      name,
      email,
      admin,
      active
    FROM
      users
    WHERE
      id = $1
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: QueryResult<UserResponseWithoutPassword> = await client.query(queryConfig);

  return queryResult.rows[0];
};

export default listUserProfileService;
