import { User } from '../../../entities/User';
import { appDataSource } from '../../../db/data-source';
import { validationEmailRegex, validationPasswordRegex } from '../../../utils/regex_utils'; 
import { hash } from 'bcrypt';
import { appDataSourceTest } from '../../../db/data-source';
import { UserExistEmailError } from '../../../errors/UserEmailError';

export interface UserInput {
  name: string;
  email: string;
  password: string;
  birthDate: string;
}

const mutationResolversUser = {
  Mutation: {
    createUser: async (_: any, { data }: { data: UserInput }) => {
      
      let repo;

      if (process.env.NODE_ENV === "test") {
        repo = appDataSourceTest.getRepository(User);
      } else if (process.env.NODE_ENV === "development") {
        repo = appDataSource.getRepository(User);
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
    updateUser: async (_: any, { email, data }: { email: string, data: UserInput }) => {
      let repo;

      if (process.env.NODE_ENV === "test") {
        repo = appDataSourceTest.getRepository(User);
      } else if (process.env.NODE_ENV === "development") {
        repo = appDataSource.getRepository(User);
      }

      const user = await repo.findOne({ where: { email } });

      if (!user) {
        throw new Error('User not found');
      }

      if (data.email && data.email !== email) {
        const existingUser = await repo.findOne({ where: { email: data.email } });
        if (existingUser) {
          throw new UserExistEmailError();
        }
      }

      validationEmailRegex(data.email);

      if (data.password) {
        validationPasswordRegex(data.password);
        const passwordHash = await hash(data.password, 10);
        user.password = passwordHash;
      }

      user.name = data.name;
      user.email = data.email;
      user.birthDate = data.birthDate;

      return repo.save(user);
    },
    deleteUser: async (_: any, { email }: { email: string }) => {
      let repo;

      if (process.env.NODE_ENV === "test") {
        repo = appDataSourceTest.getRepository(User);
      } else if (process.env.NODE_ENV === "development") {
        repo = appDataSource.getRepository(User);
      }

      const user = await repo.findOne({ where: { email } });

      if (!user) {
        throw new Error('User not found');
      }

      await repo.remove(user);

      return { message: 'User deleted successfully' };
    },
  },
};

export default mutationResolversUser;
