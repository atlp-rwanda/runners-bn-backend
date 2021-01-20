import models from '../database/models';

const { User } = models;
/** Class representing a User services . */
class UserService {
  /**
   * Get user by email if exists
   * @param {string} param parameter to be checked against
   * @return {object} Oject of user if found
   */
  static async findUser(param) {
    try {
      const user = await User.findOne({ where: param });
      return user ? user.get() : null;
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

  /**
   * Get user by email if exists
   * @param {Object} user what to be updated
   * @param {string} param parameters to be checked against
   * @return {object} Oject of user if found
   */
  static async createUser(user) {
    try {
      return await User.create(user);
    } catch (error) {
      return error;
    }
  }
}

export default UserService;
