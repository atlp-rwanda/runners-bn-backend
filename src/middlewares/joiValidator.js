import Joi from 'joi';
import joiResponse from '../helpers/joiResponse';
/** Class representing joi validation . */
class JoiValidator {
/**
* @description this method validate user result
* @param {object} req
* @param {object} res
* @param {object} next
* @returns {object} res
* @memberof JoiValidator
*/
  static signupValidator(req, res, next) {
    const schema = Joi.object({
      firstName: Joi.string().required().regex(/^[a-z ,.'-]+$/i),
      lastName: Joi.string().required().regex(/^[a-z ,.'-]+$/i),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8).label('Password'),
      confirmPassword: Joi.any().valid(Joi.ref('password')).required().label('Confirm password')
        .options({ messages: { 'any.only': '{{#label}} does not match' } })
    });
    joiResponse(req.body, res, schema, next);
  }

  /**
* @description this method validate user result
* @param {object} req
* @param {object} res
* @param {object} next
* @returns {object} res
* @memberof JoiValidator
*/
  static signinValidator(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
    });
    joiResponse(req.body, res, schema, next);
  }

  /**
* @description this method validate user result
* @param {object} req
* @param {object} res
* @param {object} next
* @returns {object} res
* @memberof JoiValidator
*/
  static roleValidator(req, res, next) {
    const schema = Joi.object({
      role: Joi.valid('manager', 'requester', 'tripAdmin').required(),
    });
    joiResponse(req.body, res, schema, next);
  }

  /**
* @description this method validate user result
* @param {object} req
* @param {object} res
* @param {object} next
* @returns {object} res
* @memberof JoiValidator
*/
  static roleIdValidator(req, res, next) {
    const schema = Joi.object({
      id: Joi.number().required(),
    });
    joiResponse(req.params, res, schema, next);
  }

  /**
* @description this method validate user result
* @param {object} req
* @param {object} res
* @param {object} next
* @returns {object} res
* @memberof JoiValidator
*/
  static forgotPassValidator(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email().required()
    });
    joiResponse(req.body, res, schema, next);
  }

  /**
* @description this method validate user result
* @param {object} req
* @param {object} res
* @param {object} next
* @returns {object} res
* @memberof JoiValidator
*/
  static resetPassValidator(req, res, next) {
    const schema = Joi.object({
      password: Joi.string().required(),
      confirmPassword: Joi.any().valid(Joi.ref('password')).required()
        .options({ messages: { 'any.only': 'Passwords does not match' } }),
    });
    joiResponse(req.body, res, schema, next);
  }
}
export default JoiValidator;
