import { User } from '../../../entities/User';
import { appDataSource } from '../../../db/data-source';
import { regexEmail, regexPassword } from '../../../utils/regex_utils';
import { hash } from 'bcrypt';

interface UserInput {
  name: string;
  email: string;
  password: string;
  birthDate: string;
}

const mutationResolversUser = {
  Mutation: {
    createUser: async (_: any, { data }: { data: UserInput }) => {
      const repo = appDataSource.getRepository(User);

      regexPassword(data.password);
      regexEmail(data.email);

      const passwordHash = await hash(data.password, 10)

      const user = repo.create({
        name: data.name,
        email: data.email,
        password: passwordHash,
        birthDate: data.birthDate,
      });

      const userCreated = await repo.save(user);

      return userCreated;
    },
  },
};

export default mutationResolversUser;
