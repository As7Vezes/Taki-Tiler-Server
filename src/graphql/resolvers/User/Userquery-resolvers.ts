import { appDataSource } from "../../../db/data-source";
import { User } from "../../../entities/User";

const queryResolversUser = {
  Query: {
    hello: () => 'Hello World!',
    users: async () => {
      const repo = appDataSource.getRepository(User)
      const users = await repo.find()
      return users
    }
  },
};

export default queryResolversUser;
