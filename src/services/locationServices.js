import models from '../database/models';

const { Location } = models;
/** Class representing location services */
export default class LocationServices {
  /**
   * @description get location if exists
   * @param {string} data parameter to be checked against
   * @return {object} Oject of location if found
   */
  static async findLocation(data) {
    try {
      const location = await Location.findOne({ where: { id: data } });
      return location ? location.get() : null;
    } catch (error) {
      return error;
    }
  }
}
