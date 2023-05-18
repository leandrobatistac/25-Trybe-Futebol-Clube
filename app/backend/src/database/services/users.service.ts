import userModel from '../models/users.model';

const getUserByEmail = async (email:string) => {
  const user = userModel.findOne({
    attributes: ['id', 'email', 'password'],
    where: { email },
  });

  return user;
};

const userService = {
  getUserByEmail,
};

export default userService;
