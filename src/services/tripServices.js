import models from '../database/models';

const { User, Trip, Location } = models;
const userInc = {
  model: User,
  attributes: ['firstName', 'lastName', 'email']
};
const locationInc = {
  model: Location,
  attributes: ['name']
};

/** Class representing a Trip services . */
class TripService {
  /**
* @description this method validate user inputs
* @param {object} request contains valid request attributes
* @returns {object} returns schema object
* @memberof TripService
*/
  static async create(request) {
    try {
      return await Trip.create(request);
    } catch (error) {
      return error;
    }
  }

  /**
* @description this method validate user inputs
* @param {param} param contains the id of the requester or manager
* @returns {object} returns schema object
* @memberof TripService
*/
  static async findAll(param) {
    try {
      return await Trip.findAll({
        where: param,
        include: [
          { ...userInc, as: 'requester' },
          { ...userInc, as: 'manager' },
          { ...locationInc, as: 'departure' },
          { ...locationInc, as: 'destination' }
        ]
      });
    } catch (error) {
      return error;
    }
  }

  /**
* @description this method validate user inputs
* @param {param} param contains the condition
* @returns {object} returns schema object
* @memberof TripService
*/
  static async findOne(param) {
    try {
      return await Trip.findOne({
        where: param,
        include: [
          { ...userInc, as: 'requester' },
          { ...userInc, as: 'manager' },
          { ...locationInc, as: 'departure' },
          { ...locationInc, as: 'destination' }
        ]
      });
    } catch (error) {
      return error;
    }
  }
}

export default TripService;
