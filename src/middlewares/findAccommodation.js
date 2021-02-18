import code from '../helpers/statusCode';
import Response from '../helpers/sendResponse';
import AccommodationServices from '../services/accommodationService';

/** class to check the accommodation existence */
export default class Accommodation {
  /**
   *@description This method ensures the accommodation exists and the user is ready to create a room
   * @param {Object} req used to provide user requests
   * @param {Object} res used to provide response to the user
   * @param {Object} next used to move to the next middleware
   * @returns {object} returns error if found
   */
  static async findAccommodation(req, res, next) {
    try {
      const accommodationExist = await AccommodationServices.findAccommodation(
        { id: req.body.accommodationId }
      );
      if (!accommodationExist) return Response.error(res, code.notFound, 'Accommodation does not exist');
      req.accommodation = accommodationExist;
      next();
    } catch (err) {
      return Response.error(res, code.serverError, 'Oops something went wrong!!');
    }
  }
}
