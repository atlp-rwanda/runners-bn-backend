import { Op } from 'sequelize';
import { uploadPic } from '../config/cloudinary';
import RoomServices from '../services/roomServices';
import Response from '../helpers/sendResponse';
import code from '../helpers/statusCode';

/** Class representing room controllers */
export default class roomController {
  /**
   * create room
   * @param {Object} req provides the requests from Admin to controllers
   * @param {Object} res provides responses to the admin
   * @return {object} Oject of data or error
  */
  static async createRoom(req, res) {
    try {
      const { accommodationId } = req.body;
      // uploading pictures
      if (req.files.length === 0) return Response.error(res, code.notFound, 'please! provide a picture for your room');
      const roomImages = await uploadPic(req.files, res);
      const room = await RoomServices.findSingleRooms(
        { [Op.and]: [{ roomNumber: req.body.roomNumber }, { accommodationId }] },
      );
      if (room) return Response.error(res, code.conflict, 'Room already exist');
      // create room
      const newroom = await RoomServices.createRoom(
        { ...req.body, photo: roomImages }
      );
      return Response.success(res, code.created, 'room created successfully', { room: newroom });
    } catch (error) {
      return Response.error(res, code.serverError, 'Room was not created');
    }
  }

  /**
   * Get all  rooms
   * @param {Object} req provides the requests from Admin to controllers
   * @param {Object} res provides responses to the admin
   * @return {object} Oject of data or error
  */
  static async getAllRooms(req, res) {
    try {
      const availableRooms = await RoomServices.findAllRooms();
      if (availableRooms.length === 0) return Response.error(res, code.notFound, 'No Rooms found in the accommodations');
      return Response.success(res, code.ok, 'Successfuly fetched all rooms', { rooms: availableRooms });
    } catch (err) {
      return Response.error(res, code.serverError, 'Something went wrong');
    }
  }

  /**
   * Get single  room
   * @param {Object} req provides the requests from Admin to controllers
   * @param {Object} res provides responses to the admin
   * @return {object} Oject of data or error
  */
  static async getSingleRoom(req, res) {
    try {
      const { id } = req.params;
      const room = await RoomServices.findSingleRooms({ id });
      if (!room) return Response.error(res, code.notFound, 'Room does not exist');
      return Response.success(res, code.ok, 'Successfuly fetched single room', { room });
    } catch (err) {
      return Response.error(res, code.serverError, 'Something went wrong');
    }
  }

  /**
   * delete single  room
   * @param {Object} req provides the requests from Admin to controllers
   * @param {Object} res provides responses to the admin
   * @return {object} Oject of data or error
  */
  static async deleteRoom(req, res) {
    try {
      const { id } = req.params;
      const room = await RoomServices.findSingleRooms({ id });
      if (!room) return Response.error(res, code.notFound, 'Room does not exist');
      const deletedRoom = await RoomServices.deleteRoom({ id });
      if (!deletedRoom) return Response.error(res, code.notFound, 'Failed to delete a room');
      return Response.success(res, code.ok, 'Successfuly deleted room');
    } catch (err) {
      return Response.error(res, code.serverError, 'Something went wrong');
    }
  }

  /**
   * update room
   * @param {Object} req provides the requests from Admin to controllers
   * @param {Object} res provides responses to the admin
   * @return {object} Oject of data or error
  */
  static async updateRoom(req, res) {
    try {
      const { id } = req.params;
      const room = await RoomServices.findSingleRooms({ id });
      if (!room) return Response.error(res, code.notFound, 'Room does not exist');
      if (req.accommodation.id !== room.accommodationId) return Response.error(res, code.notFound, 'Room does not exist in this accommodation');
      // uploading pictures
      if (req.files.length !== 0) {
        const roomImages = await uploadPic(req.files, res);
        req.body.photo = roomImages;
      }
      // update room
      RoomServices.updateRoom(req.body, { id });
      return Response.success(res, code.ok, 'Room updated successfully');
    } catch (error) {
      return Response.error(res, code.serverError, 'something went wrong');
    }
  }
}
