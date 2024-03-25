import { appDataSource, appDataSourceTest } from "../../../db/data-source";
import { User } from "../../../entities/User";

const queryResolversUser = {
  Query: {
    hello: () => 'Hello World!',
    users: async () => {
      let repo: any;

      if (process.env.NODE_ENV === 'test') {
        repo = appDataSourceTest.getRepository(User);
      } else if (process.env.NODE_ENV === 'development') {
        repo = appDataSource.getRepository(User);
      } 

      return repo.find();
    },
    findUser: async (_: any, { id }: { id: string }) => {
      let repo: any;

      if (process.env.NODE_ENV === 'test') {
        repo = appDataSourceTest.getRepository(User);
      } else if (process.env.NODE_ENV === 'development') {
        repo = appDataSource.getRepository(User);
      } 

      return repo.findOne({ where: { id } });
    }
  },
};

export default queryResolversUser;
