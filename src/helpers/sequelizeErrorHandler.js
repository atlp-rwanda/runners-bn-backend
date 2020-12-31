import code from './statusCode';

const sequelizeErrorHandler = (error) => {
  const errors = {};
  if (error.name === 'SequelizeUniqueConstraintError') {
    if (error.fields.accommodationName) {
      errors.accommodationName = 'Accommodation already exists';
    }

    return { errors, statusCode: code.conflict };
  }

  return { errors: error.message, statusCode: code.serverError };
};

export default sequelizeErrorHandler;
