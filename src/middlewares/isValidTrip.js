import Response from '../helpers/sendResponse';
import code from '../helpers/statusCode';
import TripService from '../services/tripServices';

/** class to validate trips passed into a route */
export default class isValidTrip {
  /**
   *@description This method ensures the trip exists and the commentor is related to the trip
   * @param {Object} req used to provide user requests
   * @param {Object} res used to provide response to the user
   * @param {Object} next used to move to the next middleware
   * @return {object} object of payload or error
   */
  static async isValid(req, res, next) {
    try {
      const { id } = req.user;
      const trip = await TripService.findOne({ id: req.params.id });
      if (!trip) return Response.error(res, code.notFound, 'Trip does not exists');
      if (id !== trip.userId && id !== trip.managerId) return Response.error(res, code.forbidden, 'forbidden!');
      req.trip = trip;
      next();
    } catch (error) {
      return Response.error(res, code.serverError, 'Oops something went wrong!!');
    }
  }
}
