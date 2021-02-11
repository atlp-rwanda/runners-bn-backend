import verifyToken from '../helpers/verifyToken';

/** Class representing user authentication */
export default class Auth {
  /**
   *reset password authentication
   * @param {Object} req used to provide user requests
   * @param {Object} res used to provide response to the user
   * @param {Object} next used to move to the next middleware
   * @return {object} object of payload or error
   */
  static userAuth(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    verifyToken(token, req, res, next);
  }

  /**
   *reset password authentication
   * @param {req} req used to provide user requests
   * @param {res} res used to provide response to the user
   * @param {next} next used to move to the next middleware
   * @return {object} object of payload or error
   */
  static resetPassAuth(req, res, next) {
    const { token } = req.params;
    verifyToken(token, req, res, next);
  }
}
