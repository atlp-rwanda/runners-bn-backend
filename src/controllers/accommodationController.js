import { uploadPic } from '../config/cloudinary';
import AccommodationServices from '../services/accommodationService';
import Response from '../helpers/sendResponse';
import code from '../helpers/statusCode';
import sequelizeErrorHandler from '../helpers/sequelizeErrorHandler';

/** Class representing accommodation controllers */
export default class AccommodationController {
  /**
   * create accommodation
   * @param {Object} req provides the requests from Admin to controllers
   * @param {Object} res provides responses to the admin
   * @return {object} Oject of data or error
  */
  static async createAccommodation(req, res) {
    // creating amenities of an array
    const createdBy = req.user.firstName;
    const amenity = req.body.amenities;
    const amenitiesArray = [];
    amenitiesArray.push(amenity);
    // uploading pictures
    const accommodationImage = await uploadPic(req.files, res);
    if (accommodationImage.length === 0) return Response.error(res, code.notFound, 'please! provide a picture for your accommodation');
    const newAccommodation = await AccommodationServices
      .createAccommodation({
        ...req.body, createdBy, photo: accommodationImage, amenities: amenitiesArray
      });
    if (newAccommodation.errors) {
      const { errors, statusCode } = sequelizeErrorHandler(newAccommodation.errors);
      return Response.error(res, statusCode, errors);
    }
    return Response.success(res, code.created, 'Accommodation created successfully', { accommodation: newAccommodation });
  }

  /**
   * Get all  accommodations
   * @param {Object} req provides the requests from Admin to controllers
   * @param {Object} res provides responses to the admin
   * @return {object} Oject of data or error
  */
  static async GetAllAccommodations(req, res) {
    const availableAccommodations = await AccommodationServices.findAllAccommodations();
    if (!availableAccommodations) return Response.error(res, code.notFound, 'Accommodations does not exist');
    return Response.success(res, code.ok, 'Successfuly fetched all accommodations', { accommodations: availableAccommodations });
  }

  /**
   * Get single  accommodations
   * @param {Object} req provides the requests from Admin to controllers
   * @param {Object} res provides responses to the admin
   * @return {object} Oject of data or error
  */
  static async GetSingleccommodation(req, res) {
    const { id } = req.params;
    const accommodationExist = await AccommodationServices.findAccommodation({ id });
    if (!accommodationExist) return Response.error(res, code.notFound, 'Accommodation does not exist');
    return Response.success(res, code.ok, 'Successfuly fetched accommodation', { singleAccommodation: accommodationExist });
  }

  /**
   * Get and delete  accommodation
   * @param {Object} req provides the requests from Admin to controllers
   * @param {Object} res provides responses to the admin
   * @return {object} Oject of data or error
  */
  static async deleteAccommodation(req, res) {
    const { id } = req.params;
    const deletedAccoommodation = await AccommodationServices.deleteAccommodation({ id });
    if (!deletedAccoommodation) return Response.error(res, code.notFound, 'Accommodation with that id is not found');
    return Response.success(res, code.ok, 'Accommodation deleted successfully');
  }

  /**
   * create accommodation
   * @param {Object} req provides the requests from Admin to controllers
   * @param {Object} res provides responses to the admin
   * @return {object} Oject of data or error
  */
  static async updateAccommodation(req, res) {
    try {
      const { id } = req.params;
      // checking accommodation existence
      const foundAccommodation = await AccommodationServices.findAccommodation({ id });
      if (!foundAccommodation) return Response.error(res, code.notFound, 'Accommodation not found');
      // check for file
      const accommodationImage = await uploadPic(req.files, res);
      if (accommodationImage.length === 0) return Response.error(res, code.notFound, 'please! provide a picture for your accommodation');

      // creating amenities of an array
      const amenity = req.body.amenities;
      const amenitiesArray = [];
      amenitiesArray.push(amenity);
      req.body.amenities = amenitiesArray;
      req.body.photo = accommodationImage;
      AccommodationServices.updateAccommodation(req.body, { id });
      return Response.success(res, code.ok, 'Accommodation updated successfully');
    } catch (error) {
      return Response.error(res, code.serverError, 'something went wrong');
    }
  }
}
