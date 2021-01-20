import models from '../database/models';

const { User } = models;
/** Class representing a User services . */
class UserService {
/**
   * Get user by email if exists
<<<<<<< HEAD
   * @param {string} param email to be checked against
   * @param {res} res used to give server error response to the user
=======
   * @param {string} param parameter to be checked against
>>>>>>> eabc650 ( feat(reset password): resets password)
   * @return {object} Oject of user if found
   */
  static async findUser(param) {
    try {
      const user = await User.findOne({ where: param });
      return user;
    } catch (error) {
      return error;
    }
  }

  /**
   * Get user by email if exists
   * @param {Object} user what to be updated
   * @param {string} param parameters to be checked against
   * @return {object} Oject of user if found
   */
  static async updateUser(user, param) {
    try {
      return await User.update(user, {
        where: [param]
      });
    } catch (error) {
      return error;
    }
  }
}

export default UserService;
