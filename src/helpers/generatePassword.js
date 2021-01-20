import bcrypt from 'bcrypt';
/** Class representing a User services . */
class Password {
  /**
   * @description this method encrypt password
   * @param {object} password
   * @returns {object} newPassword
   * @memberof Password
   */
  static async encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const newPassword = bcrypt.hash(password, salt);
    return newPassword;
  }
}
export default Password;
