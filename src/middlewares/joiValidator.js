/* eslint-disable require-jsdoc */
import Joi from 'joi';
import joiResponse from '../helpers/joiResponse';

export default class JoiValidator {
  static roleValidator(req, res, next) {
    const schema = Joi.object({
      role: Joi.valid('manager', 'requester', 'tripAdmin').required(),
    });
    joiResponse(req.body, res, schema, next);
  }

  static roleIdValidator(req, res, next) {
    const schema = Joi.object({
      id: Joi.number().required(),
    });
    joiResponse(req.params, res, schema, next);
  }

  static forgotPassValidator(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email().required()
    });
    joiResponse(req.body, res, schema, next);
  }

  static resetPassValidator(req, res, next) {
    const schema = Joi.object({
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
    });
    joiResponse(req.body, res, schema, next);
  }
}
