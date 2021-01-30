import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

/**
   * Get user by email if exists
   * @param {string} data email to be checked against
   * @param {res} res used to give server error response to the user
   * @return {object} Oject of user if found
   */
const { JWT_KEY } = process.env;
const generateToken = (data) => {
  const token = jwt.sign({
    id: data.id,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    role: data.role
  }, JWT_KEY);
  return token;
};
export default generateToken;
