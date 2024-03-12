import queryResolversUser from './Userquery-resolvers';
import mutationResolversUser from './Usermutation-resolvers';

const resolvers = {
  ...queryResolversUser,
  ...mutationResolversUser
};

export default resolvers;
