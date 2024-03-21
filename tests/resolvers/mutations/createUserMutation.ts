const createUserMutation = `
  mutation CreateUser($data: UserInput) {
    createUser(data: $data) {
        id
        name
        email
        birthDate
    }
  }
`;

export default createUserMutation;
