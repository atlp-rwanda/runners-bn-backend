import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const { JWT_KEY } = process.env;
const generateToken = (data) => {
  const token = jwt.sign({
    id: data.id,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    role: data.role,
  }, JWT_KEY);
  return token;
};
export default generateToken;
