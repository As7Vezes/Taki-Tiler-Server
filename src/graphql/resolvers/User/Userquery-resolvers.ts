import { User } from '../../../entities/User';
import { getRepositoryByEnvironment } from '../../../utils/repositoryUltis';

const repo = getRepositoryByEnvironment(process.env.NODE_ENV, User);

const queryResolversUser = {
  Query: {
    hello: () => 'Hello World!',
    users: async () => {

      if (repo) {
        return repo.find();
      } else {
        console.error('Erro ao obter o repositório com base no ambiente.');
      }
      
    },
    findUser: async (_: any, { id }) => {
      if (repo) {
        return repo.findOne(id);
      } else {
        console.error('Erro ao obter o repositório com base no ambiente.');
      }
    },
  },
};

export default queryResolversUser;
