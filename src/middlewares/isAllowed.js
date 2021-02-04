import Response from '../helpers/sendResponse';
import code from '../helpers/statusCode';
import roles from '../helpers/roles';

/** class representing  allowed  user on a route */
class isAllowed {
  /**
* @description this method checks if the user is a commentator
* @param {object} req  provides the requests' info from users
* @param {object} res  provides relevant responses to the user
* @param {object} next moves to the next middleware in route
* @returns {object} returns object
* @memberof isAllowed
*/
  static isCommentator(req, res, next) {
    const { role } = req.user;
    if (role !== roles.REQUESTER && role !== roles.MANAGER) return Response.error(res, code.forbidden, 'forbidden!');
    next();
  }
}

export default isAllowed;
