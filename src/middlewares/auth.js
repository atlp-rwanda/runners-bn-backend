import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import Response from '../helpers/sendResponse';
import code from '../helpers/statusCode';

config();

const { JWT_KEY } = process.env;

/** Class representing user authentication */
export default class Auth {
  /**
   *reset password authentication
   * @param {Object} req used to provide user requests
   * @param {Object} res used to provide response to the user
   * @param {Object} next used to move to the next middleware
   * @return {object} object of payload or error
   */
  static adminAuth(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return Response.error(res, code.unauthorized, 'Access denied. no token provided');
    try {
      const payload = jwt.verify(token, JWT_KEY);
      req.user = payload;
      next();
    } catch (error) {
      return Response.error(res, code.unauthorized, 'Invalid token.');
    }
  }
}
