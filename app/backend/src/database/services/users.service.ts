import userModel from '../models/users.model';

const getUserByName = async (email:string) => userModel.findOne({
  attributes: ['id', 'email', 'password'],
  where: { email },
});

const userService = {
  getUserByName,
};

export default userService;
