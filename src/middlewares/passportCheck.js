import passport from 'passport';
import Response from '../helpers/sendResponse';
import code from '../helpers/statusCode';

const passportAuth = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      const { message } = err;
      return Response.error(res, code.unauthorized, message);
    }
    req.user = user;
    next();
  })(req, res);
};

export default passportAuth;
