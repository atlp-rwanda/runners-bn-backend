import bcrypt from 'bcrypt';
import Response from '../helpers/sendResponse';
import managers from '../helpers/manager';
import roles from '../helpers/roles';
import UserService from '../services/userServices';
import sendEmailToUser from '../helpers/mailer/sendMailer';
import actionsEnum from '../helpers/actions';
import code from '../helpers/statusCode';

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
        await sendEmailToUser(foundUser.email, actionsEnum.resetPassword, foundUser);
        return Response.success(res, code.created, 'email has been sent please change your password');
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
      const { password, confirmPassword } = req.body;
      const user = await UserService.findUser({ email });
      if (password !== confirmPassword) return Response.error(res, code.badRequest, 'Make sure your passwords match!');
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
}
