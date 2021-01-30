import 'dotenv/config';
import bcrypt from 'bcryptjs';
import localStrategys from 'passport-local';
import UserServices from '../services/userServices';

const LocalStrategy = localStrategys.Strategy;
/**
   * signin using passport config
   * @param {string} passport to be exported
   * @return {object} Oject of user if found
   */
export default (passport) => {
/**
 * Called when user is added into the session.
 * It stores only the unique id of the user into the session.
 */
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  /**
 * Called when we need the values of the
 * It takes the id into the session then finds the user in the database
 * and returns it.
 * You can store whole user data into the session to avoid calling database for user.
 */
  passport.deserializeUser(async (user, done) => {
    try {
      const { id } = user;
      const userObj = await UserServices.findUser({ id });
      done(null, userObj);
    } catch (error) {
      done(error);
    }
  });

  /**
 * Passport Local Strategey
 *
 * 'passReqToCallback' is set to true to access req object and to set some flash messages
 * in case of any errors.
 */
  passport.use(new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email', // the desired username field you have defaults to 'username'
    passwordField: 'password', // the desired password field you have defaults to 'password'
  }, (async (req, email, password, done) => {
    try {
      const user = await UserServices.findUser({ email });
      if (!user) {
        done({ message: 'This email is not registered! please signup' });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        done({ message: 'Incorrect  email or password' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })));
};
