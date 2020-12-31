import models from '../database/models';

const { Accommodation } = models;
/** Class representing accommodation services */
export default class AccommodationServices {
  /**
   * @description get accommodation by name if exists
   * @param {string} data parameter to be checked against
   * @return {object} Oject of user if found
   */
  static async findAccommodation(data) {
    try {
      const accommodation = await Accommodation.findOne({ where: data });
      return accommodation ? accommodation.get() : null;
    } catch (error) {
      return error;
    }
  }

  /**
   * @description get accommodation if exists
   * @return {object} Oject of accommodation if found
   */
  static async findAllAccommodations() {
    try {
      const accommodations = await Accommodation.findAll({});
      return accommodations.map((accommodation) => accommodation.get());
    } catch (error) {
      return error;
    }
  }

  /**
   * @description delete accommodation if exists
   * @param {string} data parameter to be checked against
   * @return {object} Oject of accommodation if found
   */
  static async deleteAccommodation(data) {
    try {
      const deleted = await Accommodation.destroy({ where: data });
      return deleted;
    } catch (error) {
      return error;
    }
  }

  /**
   * @description create accommodation
   * @param {string} data parameter to be checked against
   * @return {object} Oject of accommodation if found
   */
  static async createAccommodation(data) {
    try {
      return await Accommodation.create(data);
    } catch (error) {
      return { errors: error };
    }
  }

  /**
   * @description update accommodation
   * @param {string} data parameter to be checked against
   * @param {string} param parameter to be checked against
   * @return {object} Oject of accommodation if found to be updated
   */
  static async updateAccommodation(data, param) {
    try {
      return await Accommodation.update(data, {
        where: param
      });
    } catch (error) {
      return error;
    }
  }
}
