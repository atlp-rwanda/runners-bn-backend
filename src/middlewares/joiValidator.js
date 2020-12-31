import Joi from 'joi';
import joiResponse from '../helpers/joiResponse';
/** Class representing joi validation . */
export default class JoiValidator {
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
      password: Joi.string().required().min(4),
    });
    joiResponse(req.body, res, schema, next);
  }

  /**
* @description this method validate user inputs
* @param {object} req  provides the requests from users
* @param {object} res  provides relevant responses to the user
* @param {object} next moves to the next middleware in route
* @returns {object} returns schema object
* @memberof JoiValidator
*/
  static roleValidator(req, res, next) {
    const schema = Joi.object({
      role: Joi.valid('manager', 'requester', 'tripAdmin').required(),
    });
    joiResponse(req.body, res, schema, next);
  }

  /**
* @description this method validate user inputs
* @param {object} req  provides the requests from users
* @param {object} res  provides relevant responses to the user
* @param {object} next moves to the next middleware in route
* @returns {object} returns schema object
* @memberof JoiValidator
*/
  static roleIdValidator(req, res, next) {
    const schema = Joi.object({
      id: Joi.number().min(1).required(),
    });
    joiResponse(req.params, res, schema, next);
  }

  /**
* @description this method validate user inputs
* @param {object} req  provides the requests from users
* @param {object} res  provides relevant responses to the user
* @param {object} next moves to the next middleware in route
* @returns {object} returns schema object
* @memberof JoiValidator
*/
  static forgotPassValidator(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email().required()
    });
    joiResponse(req.body, res, schema, next);
  }

  /**
* @description this method validate user inputs
* @param {object} req  provides the requests from users
* @param {object} res  provides relevant responses to the user
* @param {object} next moves to the next middleware in route
* @returns {object} returns schema object
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

  /**
* @description this method validate user result
* @param {object} req
* @param {object} res
* @param {object} next
* @returns {object} res
* @memberof JoiValidator
*/
  static accommodationValidator(req, res, next) {
    const schema = Joi.object({
      accommodationName: Joi.string().required().min(3).max(50),
      accommodationType: Joi.string().required().min(3).max(10),
      description: Joi.string().required().min(5).max(1000),
      amenities: Joi.string().min(1).required(),
      numberOfRooms: Joi.number().required().min(1),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      locationId: Joi.number().valid(1, 2, 3, 4).required().label('Location Id')
        .options({ messages: { 'any.only': '{{#label}} does not match any location ' } }),
      streetAddress: Joi.string().required().min(3),
    });
    joiResponse(req.body, res, schema, next);
  }

  /**
* @description this method validate user inputs
* @param {object} req  provides the requests from users
* @param {object} res  provides relevant responses to the user
* @param {object} next moves to the next middleware in route
* @returns {object} returns schema object
* @memberof JoiValidator
*/
  static tripReqValidator(req, res, next) {
    const schema = Joi.object({
      from: Joi.number().min(1).required(),
      to: Joi.number().min(1).disallow(Joi.ref('from')).required(),
      reason: Joi.string().min(5).required(),
      travelDate: Joi.date().min('now').required(),
      returnDate: Joi.date().min(Joi.ref('travelDate'))
    });
    joiResponse(req.body, res, schema, next);
  }

  /**
* @description this method validate user inputs
* @param {object} req  provides the requests from users
* @param {object} res  provides relevant responses to the user
* @param {object} next moves to the next middleware in route
* @returns {object} returns schema object
* @memberof JoiValidator
*/
  static tripIdValidator(req, res, next) {
    const schema = Joi.object({
      tripId: Joi.number().min(1).required(),
    });
    joiResponse(req.params, res, schema, next);
  }

  /**
* @description this method validate user inputs
* @param {object} req  provides the comment request from users
* @param {object} res  provides relevant responses to the user
* @param {object} next moves to the next middleware in route
* @returns {object} returns schema object
* @memberof JoiValidator
*/
  static commentValidator(req, res, next) {
    const schema = Joi.object({
      comment: Joi.string().min(2).required()
    });
    joiResponse(req.body, res, schema, next);
  }
}
