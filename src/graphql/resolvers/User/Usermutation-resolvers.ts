import { User } from '../../../entities/User';
import { appDataSource } from '../../../db/data-source';
import { validationEmailRegex, validationPasswordRegex } from '../../../utils/regex_utils'; 
import { hash } from 'bcrypt';
import { appDataSourceTest } from '../../../db/data-source';

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
        throw new Error("Error, User already exist")
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
