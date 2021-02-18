import models from '../database/models';

const { Room } = models;
/** Class representing rooms services */
export default class RoomServices {
  /**
   * @description create room
   * @param {string} data parameter to be checked against
   * @return {object} Oject of rooms if found
   */
  static async createRoom(data) {
    try {
      return await Room.create(data);
    } catch (error) {
      return { errors: error };
    }
  }

  /**
   * @description get all  rooms
   * @param {string} accommodationId parameter to be checked against
   * @return {object} Oject of rooms if found
   */
  static async findAllRooms() {
    try {
      const rooms = await Room.findAll({ });
      return rooms.map((room) => room.get());
    } catch (error) {
      return error;
    }
  }

  /**
   * @description get single room
   * @param {string} data parameter to be checked against
   * @return {object} Oject of room if found
   */
  static async findSingleRooms(data) {
    try {
      const room = await Room.findOne({ where: data });
      return room ? room.get() : null;
    } catch (error) {
      return error;
    }
  }

  /**
   * @description delete room if exists
   * @param {string} data parameter to be checked against
   * @return {object} Oject of accommodation if found
   */
  static async deleteRoom(data) {
    try {
      const deleted = await Room.destroy({ where: data });
      return deleted;
    } catch (error) {
      return error;
    }
  }

  /**
   * @description update room
   * @param {string} data parameter to be checked against
   * @param {string} param parameter to be checked against
   * @return {object} Oject of accommodation if found to be updated
   */
  static async updateRoom(data, param) {
    try {
      return await Room.update(data, {
        where: param
      });
    } catch (error) {
      return error;
    }
  }
}
