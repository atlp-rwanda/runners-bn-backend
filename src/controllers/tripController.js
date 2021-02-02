import { Op } from 'sequelize';
import UserService from '../services/userServices';
import TripService from '../services/tripServices';
import code from '../helpers/statusCode';
import Response from '../helpers/sendResponse';
import roles from '../helpers/roles';

/** Class representing trip controller */
export default class TripController {
  /**
   * Creates a trip
   * @param {Object} req provides the requests from body to controllers
   * @param {Object} res provides responses to the users
   * @return {object} Oject of data or error
  */
  static async create(req, res) {
    try {
      if (req.user.role !== roles.REQUESTER) return Response.error(res, code.forbidden, 'User not allowed');
      const tripExists = await TripService.findOne({
        userId: req.user.id, to: req.body.to, from: req.body.from
      });
      if (tripExists) return Response.error(res, code.conflict, 'Trip already exists');
      const { id } = req.user;
      const { id: userId, managerId } = await UserService.findUser({ id });
      const trip = await TripService.create({ ...req.body, managerId, userId });
      return Response.success(res, code.created, 'You successfully created a trip', trip);
    } catch (error) {
      return Response.error(res, code.serverError, 'Oops something went wrong');
    }
  }

  /**
   * Get all Trips
   * @param {Object} req provides the requests from body to controllers
   * @param {Object} res provides responses to the users
   * @return {object} Oject of data or error
  */
  static async getAll(req, res) {
    try {
      const trips = await TripService.findAll(
        { [Op.or]: [{ managerId: req.user.id }, { userId: req.user.id }] },
      );
      if (!trips) return Response.error(res, code.notFound, 'Trips not found');
      return Response.success(res, code.ok, 'Successfully found all your trips', trips);
    } catch (error) {
      return Response.error(res, code.serverError, 'Oops something went wrong');
    }
  }

  /**
   * Get single trip
   * @param {Object} req provides the requests from body to controllers
   * @param {Object} res provides responses to the users
   * @return {object} Oject of data or error
  */
  static async getOne(req, res) {
    try {
      const trip = await TripService.findOne(
        { id: req.params.tripId, [Op.or]: [{ managerId: req.user.id }, { userId: req.user.id }] }
      );
      if (!trip) return Response.error(res, code.notFound, 'Trip not found');
      return Response.success(res, code.ok, 'Successfully retrieved the trip', trip);
    } catch (error) {
      return Response.error(res, code.serverError, 'Oops something went wrong');
    }
  }

  /**
   * Updates a trip
   * @param {Object} req provides the requests from body to controllers
   * @param {Object} res provides responses to the users
   * @return {object} Oject of data or error
  */
  static async update(req, res) {
    try {
      if (req.user.role !== roles.REQUESTER) return Response.error(res, code.forbidden, 'User not allowed');
      const trip = await TripService.findOne({ id: req.params.tripId, userId: req.user.id });
      if (!trip) return Response.error(res, code.notFound, 'Trip not found');
      trip.update(req.body);
      return Response.success(res, code.ok, 'Successfully updated the trip', trip);
    } catch (error) {
      return Response.error(res, code.serverError, 'Oops something went wrong');
    }
  }
}
