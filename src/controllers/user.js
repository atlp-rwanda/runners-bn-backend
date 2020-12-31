import Response from '../helpers/sendResponse';
import managers from '../helpers/manager';
import roles from '../helpers/roles';
import UserService from '../services/userServices';
import code from '../helpers/statusCode';

/** Class representing user controllers */
export default class UserController {
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
      return Response.success(res, code.ok, `${user.firstName}'s role successfully changed to ${role}`, user);
    } catch (error) {
      return Response.error(res, code.serverError, error);
    }
  }
}
