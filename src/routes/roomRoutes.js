import express from 'express';
import multerAccommodationUploads from '../config/multer';
import CrudRoom from '../controllers/roomController';
import Validations from '../middlewares/joiValidator';
import Auth from '../middlewares/auth';
import isAllowed from '../middlewares/isAllowed';
import Accommodation from '../middlewares/findAccommodation';

const router = express.Router();
const { roomValidator } = Validations;

const {
  createRoom, getAllRooms, getSingleRoom, updateRoom, deleteRoom
} = CrudRoom;

const { userAuth } = Auth;
const { isTripAdmin } = isAllowed;

/**
 * @swagger
 * /rooms:
 *   post:
 *     tags:
 *       - Room
 *     security:
 *       - bearerAuth: []
 *     summary: Create accommodation room
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               accommodationId:
 *                 type: number
 *                 required: true
 *               roomType:
 *                 type: string
 *                 required: true
 *               bedType:
 *                 type: string
 *                 required: true
 *               photo:
 *                 type: string
 *                 format: binary
 *                 required: false
 *               roomNumber:
 *                 type: number
 *                 required: true
 *               roomCost:
 *                 type: number
 *                 required: true
 *
 *     responses:
 *       201:
 *             description: room successfully created.
 *       400:
 *             description: Bad request.
 *       401:
 *             description: unAuthorized.
 *       403:
 *             description: forbiden.
 *       500:
 *             description: server error.
 * */
router.post('/rooms',
  userAuth,
  isTripAdmin,
  multerAccommodationUploads,
  roomValidator,
  Accommodation.findAccommodation,
  createRoom);

/**
 * @swagger
 * /rooms:
 *   get:
 *     tags:
 *       - Room
 *     summary: Get all Rooms
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *             description: Successfully found all Rooms.
 *       404:
 *             description: Rooms not found.
 *       500:
 *             description: server error.
 * */
router.get('/rooms', getAllRooms);

/**
 * @swagger
 * /rooms/{id}:
 *   get:
 *     tags:
 *       - Room
 *     summary: Get single Room
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *             description: Successfully found Room.
 *       404:
 *             description: Rooms not found.
 *       500:
 *             description: server error.
 * */
router.get('/rooms/:id', getSingleRoom);

/**
 * @swagger
 * /rooms/{id}:
 *   put:
 *     tags:
 *       - Room
 *     security:
 *       - bearerAuth: []
 *     summary: update room accommodation
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               accommodationId:
 *                 type: number
 *                 required: true
 *               roomType:
 *                 type: string
 *                 required: true
 *               bedType:
 *                 type: string
 *                 required: true
 *               photo:
 *                 type: string
 *                 format: binary
 *                 required: false
 *               roomNumber:
 *                 type: number
 *                 required: true
 *               roomCost:
 *                 type: number
 *                 required: true
 *
 *     responses:
 *       200:
 *             description: Room successfully updated.
 *       400:
 *             description: Bad request.
 *       401:
 *             description: unAuthorized.
 *       403:
 *             description: forbiden.
 *       500:
 *             description: server error.
 * */
router.put('/rooms/:id', userAuth, isTripAdmin, multerAccommodationUploads, roomValidator, Accommodation.findAccommodation, updateRoom);

/**
 * @swagger
 * /rooms/{id}:
 *   delete:
 *     tags:
 *       - Room
 *     security:
 *       - bearerAuth: []
 *     name: Roomss
 *     summary: Deletes room
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *             description: room successfully deleted.
 *       404:
 *             description: Accommodation not found.
 *       500:
 *             description: server error.
 *       401:
 *             description: unauthorized
 * */
router.delete('/rooms/:id', userAuth, isTripAdmin, deleteRoom);
export default router;
