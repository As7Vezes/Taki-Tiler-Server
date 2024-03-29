import { User } from '../../../entities/User';
import { appDataSource } from '../../../db/data-source';
import { validationEmailRegex, validationPasswordRegex } from '../../../utils/regex_utils';
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
