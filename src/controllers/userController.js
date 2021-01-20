import bcrypt from 'bcrypt';
import Response from '../helpers/sendResponse';
import managers from '../helpers/manager';
import roles from '../helpers/roles';
import UserService from '../services/userServices';
import sendEmailToUser from '../helpers/mailer/sendMailer';
import actionsEnum from '../helpers/actions';
import code from '../helpers/statusCode';
import generateToken from '../helpers/generateToken';
import Password from '../helpers/generatePassword';

/** Class representing user controllers */
export default class UserController {
  /**
   * Get user by email if exists
   * @param {Object} req provides the requests from users to controllers
   * @param {Object} res provides responses to the users
   * @return {object} Oject of data or error
  */
  static async forgotPassword(req, res) {
    const { email } = req.body;
    try {
      const foundUser = await UserService.findUser({ email });
      if (foundUser) {
        sendEmailToUser(foundUser.email, actionsEnum.resetPassword, foundUser);
        return Response.success(res, code.ok, 'email has been sent please change your password');
      }
      return Response.error(res, code.notFound, 'user email does not exist');
    } catch (error) {
      return Response.error(res, code.serverError, error);
    }
  }

  /**
   * Get user by email if exists
   * @param {Object} req provides the requests from users to controllers
   * @param {Object} res provides responses to the users
   * @return {object} Oject of data or error
  */
  static async resetPassword(req, res) {
    try {
      const { email } = req.user;
      const { password } = req.body;
      const user = await UserService.findUser({ email });
      if (!user) return Response.error(res, code.notFound, 'User does no longer exists!');
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);
      await UserService.updateUser({ password: newPassword }, { email });
      const { firstName, lastName, role } = user;
      return Response.success(res, code.ok, 'Your password was successfully updated!', { firstName, lastName, role });
    } catch (error) {
      return Response.error(res, code.serverError, error);
    }
  }

  /**
   * Get user by email if exists
   * @param {Object} req provides the requests from users to controllers
   * @param {Object} res provides responses to the users
   * @return {object} Oject of data or error
  */
  static async updateRole(req, res) {
    try {
      if (req.user.role !== 'superAdmin') return Response.error(res, code.forbidden, 'Forbiden for non admin personel');
      const { role } = req.body;
      const { id } = req.params;
      const user = await UserService.findUser({ id });
      if (!user) return Response.error(res, code.notFound, 'User Not Found');
      if (user.role === role) return Response.error(res, code.badRequest, `${user.firstName} is already ${role}`);
      if (role === roles.REQUESTER) {
        await UserService.updateUser(
          { role, managerId: managers.DEFAULT_MANAGER },
          { id }
        );
      } else await UserService.updateUser({ role, managerId: null }, { id });
      const {
        firstName, lastName, email, managerId, createdAt, updatedAt
      } = user;
      return Response.success(res, code.ok, `${user.firstName}'s role successfully changed to ${role}`, {
        id, firstName, lastName, email, managerId, role, createdAt, updatedAt
      });
    } catch (error) {
      return Response.error(res, code.serverError, error);
    }
  }

  /**
     * @description user signUp method
     * @param {object} req
     * @param {object} res
     * @returns {object} createUser
     * @memberof userController
     */
  static async signup(req, res) {
    try {
      const { password, email } = req.body;
      // check if user exists
      const userExist = await UserService.findUser({ email });
      if (userExist) {
        return Response.error(res, code.conflict, 'User already exist');
      }
      const newPassword = await Password.encryptPassword(password);
      // update data
      req.body.password = newPassword;

      const createUser = await UserService.createUser(req.body);
      const payload = {
        id: createUser.id,
        email: createUser.email,
        firstName: createUser.firstName,
        lastName: createUser.lastName,
        role: createUser.role
      };

      const token = generateToken(payload);
      delete createUser.password;
      return Response.success(res, code.created, 'User created successfully', {
        user: createUser, token
      });
    } catch (error) {
      return Response.error(res, code.serverError, 'Something went wrong while registering');
    }
  }

  /**
     * @description user signUp method
     * @param {object} req
     * @param {object} res
     * @returns {object} createUser
     * @memberof userController
     */
  static async signin(req, res) {
    try {
      const loggedInUser = req.user;
      const payload = {
        id: loggedInUser.id,
        firstName: loggedInUser.firstName,
        lastName: loggedInUser.lastName,
        email: loggedInUser.email,
        role: loggedInUser.role
      };
      const token = generateToken(payload);
      delete loggedInUser.password;
      return Response.success(res, code.ok, 'User logged in successfully', {
        user: loggedInUser, token
      });
    } catch (error) {
      return Response.error(res, code.serverError, 'Something went wrong! Login failed');
    }
  }
}
