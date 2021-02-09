import code from './statusCode';

const sequelizeErrorHandler = (error) => {
  const errors = {};
  if (error.name === 'SequelizeUniqueConstraintError') {
    if (error.fields.email) {
      errors.email = 'Email already exists';
    }
    return { errors, statusCode: code.conflict };
  }
  return { errors: error.message, statusCode: code.serverError };
};
export default sequelizeErrorHandler;
