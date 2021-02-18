import generateToken from '../helpers/generateToken';
import Response from '../helpers/sendResponse';
import UserService from '../services/userServices';

/** Class representing socialAuthController controller */
export default class SocialAuthController {
  /**
   * Get user by email if exists
   * @param {Object} req provides the requests from google to controllers
   * @param {Object} res provides responses to the users
   * @return {object} Oject of data or error
  */
  static async successSignUp(req, res) {
    try {
      const { user: { email } } = req;
      const token = generateToken(await UserService.findUser({ email }));
      return Response.success(res, 200, 'Successfully logged in', token);
    } catch (error) {
      return Response.error(res, 500, error);
    }
  }
}
