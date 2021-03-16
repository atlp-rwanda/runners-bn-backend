/* eslint-disable camelcase */
import UserService from '../services/userServices';

const successSignUp = async (req, res, next) => {
  const { email, given_name, family_name } = req.user;
  const account = await UserService.findUser({ email });
  if (!account) {
    const user = {
      firstName: family_name,
      lastName: given_name,
      email,
      isVerified: true
    };
    await UserService.createUser(user);
  }
  next();
};

export default successSignUp;
