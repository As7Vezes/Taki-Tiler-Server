import { User } from '../../../entities/User';
import { validationEmailRegex, validationPasswordRegex } from '../../../utils/regex_utils'; 
import { hash } from 'bcrypt';
import { UserExistEmailError } from '../../../errors/UserEmailError';
import { getRepositoryByEnvironment } from '../../../utils/repositoryUltis';

export interface UserInput {
  name: string;
  email: string;
  password: string;
  birthDate: string;
}

const repo = getRepositoryByEnvironment(process.env.NODE_ENV, User);

const mutationResolversUser = {
  Mutation: {
    createUser: async (_: any, { data }: { data: UserInput }) => {
      
      if (repo) {
        return repo.find();
      } else {
        console.error('Erro ao obter o repositório com base no ambiente.');
      }

      const verifyUserExist = await repo.findOne({ where: { email: data.email } })

      if (verifyUserExist) {
        throw new UserExistEmailError()
      }

      validationPasswordRegex(data.password);
      validationEmailRegex(data.email);

      const passwordHash = await hash(data.password, 10)

      const user = new User()
      user.name = data.name
      user.email = data.email
      user.password = passwordHash
      user.birthDate = data.birthDate

      return repo.save(user);
    },
  },
};

export default mutationResolversUser;
