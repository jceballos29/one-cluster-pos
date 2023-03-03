import { Database, DatabasesResponse } from "../types.d";

export const databasesAdapter = (response: DatabasesResponse): Array<Database> => {
  return response.map((database) => ({
    id: database._id,
    name: database.name,
  }));
};
